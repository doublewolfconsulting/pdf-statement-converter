#!/bin/bash
# preprocess.sh — OCR-process scanned PDF statements for use with PDF Statement Converter
#
# Required: ocrmypdf (brew install ocrmypdf)
#
# Usage:
#   ./preprocess.sh statement.pdf              # single file → statement_ocr.pdf
#   ./preprocess.sh *.pdf                      # all PDFs in current directory
#   ./preprocess.sh ~/Downloads/hsbc/*.pdf     # specific folder

set -e

if ! command -v ocrmypdf &>/dev/null; then
    echo "Error: ocrmypdf not found. Install with: brew install ocrmypdf"
    exit 1
fi

if [ $# -eq 0 ]; then
    echo "Usage: $0 <file.pdf> [file2.pdf ...]"
    exit 1
fi

for input in "$@"; do
    if [ ! -f "$input" ]; then
        echo "Skipping: $input (not found)"
        continue
    fi
    output="${input%.pdf}_ocr.pdf"
    echo "Processing: $input → $output"
    ocrmypdf --skip-text "$input" "$output"
done

echo "Done."
