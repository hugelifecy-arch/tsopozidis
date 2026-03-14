export function captureException(error: unknown, context?: Record<string, unknown>) {
  console.error('[Error Tracking]', error, context);
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  console.log(`[${level.toUpperCase()}]`, message);
}
