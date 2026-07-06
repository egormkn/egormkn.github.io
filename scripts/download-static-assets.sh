#!/bin/bash

set -euxo pipefail

PDFJS_VERSION="v6.1.200"
PROJECT_DIR="$(npm prefix)"
TMP_DIR="$PROJECT_DIR/tmp"
OUTPUT_DIR="$PROJECT_DIR/out"
PDFJS_PATH="/pdfjs"
RESUME_PATH="/resume"

FORCE=false

while [ "$#" -gt 0 ]; do
  case "$1" in
    -f|--force)
      FORCE=true
      shift
      ;;
    -*)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
    *) # Positional arguments
      break
      ;;
  esac
done


# Download pdfjs viewer
if [[ ! -d "$TMP_DIR$PDFJS_PATH" || "$FORCE" == "true" ]]; then
  # Create temporary file
  TMP_FILE=$(mktemp) || exit 1
  trap 'rm -f "$TMP_FILE"' EXIT

  # Download zip archive
  gh release download "$PDFJS_VERSION" --repo "mozilla/pdf.js" --pattern "pdfjs-*-legacy-dist.zip" --clobber --output "$TMP_FILE"
  mkdir -p "$TMP_DIR$PDFJS_PATH"
  unzip "$TMP_FILE" -d "$TMP_DIR$PDFJS_PATH"
fi

cp -r "$TMP_DIR$PDFJS_PATH/." "$OUTPUT_DIR$PDFJS_PATH"

# Download cv build
if [[ ! -d "$TMP_DIR$RESUME_PATH" || "$FORCE" == "true" ]]; then
  gh release download --repo egormkn/cv --pattern "*.pdf" --pattern "*.html" --dir "$TMP_DIR$RESUME_PATH"
fi

cp -r "$TMP_DIR$RESUME_PATH/." "$OUTPUT_DIR$RESUME_PATH"
