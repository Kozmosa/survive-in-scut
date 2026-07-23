#!/usr/bin/env bash
# Pre-push check: run a full VitePress build to catch dead links and build
# errors before they reach CI.  If the build succeeds, auto-generated
# metadata files are restored so they don't appear as dirty in the working
# tree.
#
# Exit code: 0 if the build passes, 1 if it fails (push is aborted).

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "🔍 Pre-push check: running docs:build..."
cd "$ROOT"

npm run docs:build
BUILD_EXIT=$?

# Restore auto-generated metadata files — they are build artifacts that
# should not be committed or clutter the working tree.
git checkout --quiet -- docs/others/todo.md 2>/dev/null || true

if [ $BUILD_EXIT -eq 0 ]; then
  echo "✅ Pre-push check passed"
else
  echo "❌ Pre-push check failed — push aborted"
fi

exit $BUILD_EXIT
