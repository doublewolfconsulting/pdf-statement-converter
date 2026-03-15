#!/bin/bash
# watch.sh — Auto-OCR HSBC PDFs as they arrive in a watched folder
#
# Required: ocrmypdf + fswatch
#   brew install ocrmypdf fswatch
#
# Usage:
#   ./watch.sh                        # watches ~/Downloads
#   ./watch.sh ~/Documents/Statements # watches a custom folder

set -e

if ! command -v ocrmypdf &>/dev/null; then
    echo "Error: ocrmypdf not found. Install with: brew install ocrmypdf"
    exit 1
fi

if ! command -v fswatch &>/dev/null; then
    echo "Error: fswatch not found. Install with: brew install fswatch"
    exit 1
fi

WATCH_DIR="${1:-$HOME/Downloads}"
echo "Watching: $WATCH_DIR"
echo "New PDFs will be auto-OCR'd as *_ocr.pdf alongside the original."
echo "Press Ctrl+C to stop."
echo ""

fswatch -0 --event Created "$WATCH_DIR" | while IFS= read -r -d '' file; do
    # Only process .pdf files, skip already-OCR'd ones
    [[ "$file" != *.pdf ]] && continue
    [[ "$file" == *_ocr.pdf ]] && continue

    output="${file%.pdf}_ocr.pdf"
    echo "$(date '+%H:%M:%S') New PDF detected: $(basename "$file")"
    echo "$(date '+%H:%M:%S') OCR processing → $(basename "$output")"
    ocrmypdf --skip-text "$file" "$output" && \
        echo "$(date '+%H:%M:%S') Done: $(basename "$output")"
done
