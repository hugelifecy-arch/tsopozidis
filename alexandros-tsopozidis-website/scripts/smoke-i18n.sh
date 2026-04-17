#!/usr/bin/env bash
# Post-deploy smoke test — catches the class of regression where /ru or /el
# serves EN content (AUDIT 2026-04-17 §1.1) because a deploy shipped with a
# cold / stale i18n cache.
#
# Usage:
#   bash scripts/smoke-i18n.sh                         # hits production
#   BASE=https://staging.example.com bash scripts/smoke-i18n.sh
#
# Exits 0 if each locale serves locale-specific content, non-zero if a check
# fails (including the Tsoposidis typo regression seen on 2026-04-17).

set -euo pipefail

BASE="${BASE:-https://www.tsopozidis-alexandros.com}"
FAIL=0

check() {
  local url="$1"
  local needle="$2"
  local label="$3"
  local body
  body="$(curl -fsSL --max-time 15 "$url" || true)"
  if [[ -z "$body" ]]; then
    echo "FAIL  $label  — could not fetch $url"
    FAIL=$((FAIL + 1))
    return
  fi
  if grep -Fq -- "$needle" <<<"$body"; then
    echo "OK    $label  ($needle)"
  else
    echo "FAIL  $label  — '$needle' not in $url"
    FAIL=$((FAIL + 1))
  fi
}

antipattern() {
  local url="$1"
  local bad="$2"
  local label="$3"
  local body
  body="$(curl -fsSL --max-time 15 "$url" || true)"
  if grep -Fq -- "$bad" <<<"$body"; then
    echo "FAIL  $label  — found forbidden string '$bad' in $url"
    FAIL=$((FAIL + 1))
  else
    echo "OK    $label  (no '$bad')"
  fi
}

# Locale-specific content checks (pick strings that can't collide with EN)
check "$BASE/en" "Greek Soul"                       "en home tagline"
check "$BASE/ru" "греческая душа"                   "ru home tagline"
check "$BASE/el" "Ελληνική"                         "el home hero"

# Regression guards
antipattern "$BASE/ru" "Tsoposidis"                 "ru no 'Tsoposidis' typo"
antipattern "$BASE/en" "Tsoposidis"                 "en no 'Tsoposidis' typo"
antipattern "$BASE/el" "Tsoposidis"                 "el no 'Tsoposidis' typo"

if (( FAIL > 0 )); then
  echo ""
  echo "smoke-i18n: $FAIL check(s) failed"
  exit 1
fi

echo ""
echo "smoke-i18n: all checks passed"
