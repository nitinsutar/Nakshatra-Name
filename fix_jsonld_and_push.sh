#!/usr/bin/env bash
set -euo pipefail

# Usage: ./fix_jsonld_and_push.sh <GIT_REMOTE_URL_WITH_PAT>
# Example remote URL with PAT (run locally, don't paste token anywhere public):
# https://<YOUR_PAT>@github.com/nitinsutar/Nakshatra-Name.git

REMOTE_URL="${1:-}"
if [ -z "$REMOTE_URL" ]; then
  echo "ERROR: You must pass the remote URL with your PAT as the first arg."
  echo "Example: ./fix_jsonld_and_push.sh https://<PAT>@github.com/nitinsutar/Nakshatra-Name.git"
  exit 2
fi

FILE="pages/nakshatra/[nak]/[pada].js"
if [ ! -f "$FILE" ]; then
  echo "ERROR: file not found: $FILE"
  exit 3
fi

# Backup original
cp "$FILE" "${FILE}.bak.$(date +%s)"
echo "Backup saved to ${FILE}.bak.*"

# Create a temporary python script to do the replace reliably with AST-like regex
PY="/tmp/_fix_jsonld.py"
cat > "$PY" <<'PYCODE'
import re, sys
p = "pages/nakshatra/[nak]/[pada].js"
s = open(p, 'r', encoding='utf-8').read()

# Remove any existing blocks from "const itemListElements" up to the line that sets ldFaq (inclusive).
# This is conservative: it searches for "const itemListElements" and the following "const ldFaq = JSON.stringify(faqJson)"
pattern = re.compile(r"// --- Structured data[\\s\\S]*?const ldFaq\\s*=\\s*JSON\\.stringify\\(\\s*faqJson\\s*\\)\\s*\\n", re.M)
s2, n = pattern.subn("", s)
if n > 0:
    print(f"Removed {n} old JSON-LD block(s).")
else:
    print("No old JSON-LD block found for removal (continuing).")

# Now prepare canonical block to insert before the first 'return (' occurrence inside the component.
canonical = r'''
  // --- Structured data (JSON-LD) (single canonical block) --------------
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  // Build ItemList for the current (sample) names
  const itemListElements = (sample || []).slice(0, 50).map((s, idx) => {
    const person = {
      "@type": "Person",
      "name": s.name,
      "gender": s.gender || 'Any',
      "description": s.meaning || '',
      "additionalName": s.alternateName || '',
      "inLanguage": (s.language && s.language[0]) || 'en',
      "additionalType": "https://schema.org/GivenName",
      "sameAs": s.sameAs || []
    }
    return {
      "@type": "ListItem",
      "position": idx + 1,
      "item": person
    }
  })

  const pagePath = `${siteUrl}/nakshatra/${nak.slug}/pada-${pada}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${nak.name} — Pada ${pada} (${syllable}) — Nakshatra Baby Names`,
    "description": `Curated baby names starting with ${syllable} for ${nak.name} (Pada ${pada}).`,
    "url": pagePath,
    "numberOfItems": itemListElements.length,
    "itemListElement": itemListElements
  }

  // build FAQ JSON-LD from per-nakshatra descriptions (if present)
  const descFaqs = (descriptions && descriptions[nak.slug] && descriptions[nak.slug].faqs) || []
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": descFaqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  }

  const ldJson = JSON.stringify(jsonLd)
  const ldFaq = JSON.stringify(faqJson)
'''

# Find insertion point: the first occurrence of "\n  return (" in the file.
m = re.search(r"\n\s*return\s*\(", s2)
if not m:
    # fallback: put canonical block right before the first "<Layout"
    m = re.search(r"<Layout", s2)
    if not m:
        print("ERROR: Couldn't find a sensible insertion point (no 'return (' or '<Layout'). Exiting.")
        sys.exit(4)
    insert_pos = m.start()
else:
    insert_pos = m.start()

# Ensure we don't already have the canonical block (idempotent)
if "const itemListElements =" in s2 and "const ldFaq = JSON.stringify(faqJson)" in s2:
    print("Warning: some jsonld markers still exist, proceeding to replace with canonical block.")

# Insert canonical block
s3 = s2[:insert_pos] + canonical + s2[insert_pos:]
open(p, 'w', encoding='utf-8').write(s3)
print("Canonical JSON-LD block inserted.")
PYCODE

python3 "$PY"

# Show diff
echo "Showing git diff (uncommitted changes):"
git --no-pager diff -- "$FILE" || true

# Create branch, stage file, commit
BRANCH="fix/jsonld-duplicates"
git checkout -b "$BRANCH"
git add "$FILE"
git commit -m "Fix: remove duplicate JSON-LD blocks and insert canonical JSON-LD (ItemList + FAQ)"

# Add remote if not exists
if git remote get-url origin >/dev/null 2>&1; then
  REMOTE_NAME="origin"
else
  git remote add origin "$REMOTE_URL"
  REMOTE_NAME="origin"
fi

# Push branch to remote using provided REMOTE_URL (which contains PAT)
echo "Pushing branch $BRANCH to remote $REMOTE_NAME ..."
git push "$REMOTE_URL" "$BRANCH"

echo ""
echo "Done. Branch pushed: $BRANCH"
echo "Open this URL to create a PR in your browser:"
# derive repo path from REMOTE_URL
REPO_PATH=$(echo "$REMOTE_URL" | sed -E 's#https?://[^/]+/##' | sed -E 's#\.git$##')
echo "https://github.com/$REPO_PATH/pull/new/$BRANCH"
