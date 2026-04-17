/**
 * Distributed rate limiter backed by Upstash Redis REST API.
 *
 * On Vercel serverless (where each invocation may land on a fresh container),
 * an in-memory Map is effectively a no-op. When UPSTASH_REDIS_REST_URL and
 * UPSTASH_REDIS_REST_TOKEN are present, this uses a persistent counter with
 * TTL. Without them, it falls back to an in-memory limiter and logs a warning
 * so production configuration gaps surface during integration.
 */

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const memoryStore = new Map<string, { count: number; resetTime: number }>();
let warnedOnce = false;

async function upstashPipeline(commands: unknown[][]): Promise<unknown[]> {
  const res = await fetch(`${UPSTASH_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commands),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Upstash error: ${res.status}`);
  const data = (await res.json()) as Array<{ result: unknown } | { error: string }>;
  return data.map((entry) => ('result' in entry ? entry.result : null));
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const now = Date.now();
  const resetAt = now + windowMs;

  if (UPSTASH_URL && UPSTASH_TOKEN) {
    const ttlSeconds = Math.ceil(windowMs / 1000);
    const redisKey = `ratelimit:${key}`;
    try {
      const [count] = (await upstashPipeline([
        ['INCR', redisKey],
        ['EXPIRE', redisKey, ttlSeconds, 'NX'],
      ])) as [number];
      const remaining = Math.max(0, limit - count);
      return { allowed: count <= limit, remaining, resetAt };
    } catch (err) {
      console.error('[rate-limit] Upstash failed, falling through to memory', err);
    }
  } else if (!warnedOnce) {
    warnedOnce = true;
    console.warn(
      '[rate-limit] UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN not set — ' +
        'falling back to per-instance in-memory limiter. On Vercel serverless this ' +
        'provides only best-effort throttling across the same warm instance.',
    );
  }

  const record = memoryStore.get(key);
  if (!record || now > record.resetTime) {
    memoryStore.set(key, { count: 1, resetTime: resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }
  record.count++;
  return {
    allowed: record.count <= limit,
    remaining: Math.max(0, limit - record.count),
    resetAt: record.resetTime,
  };
}
