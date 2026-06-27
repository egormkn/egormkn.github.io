#!/bin/bash

set -euxo pipefail

PDFJS_VERSION="v6.1.200"
PROJECT_DIR="$(npm prefix)"
PDFJS_DIR="$PROJECT_DIR/public/pdfjs"
RESUME_DIR="$PROJECT_DIR/public/resume"

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

# Create temporary file
TMP_FILE=$(mktemp) || exit 1
trap 'rm -f "$TMP_FILE"' EXIT

# Download pdfjs viewer
if [[ ! -d "$PDFJS_DIR" || "$FORCE" == "true" ]]; then
  gh release download "$PDFJS_VERSION" --repo "mozilla/pdf.js" --pattern "pdfjs-*-legacy-dist.zip" --clobber --output "$TMP_FILE"
  rm -rf "$PDFJS_DIR"
  unzip "$TMP_FILE" -d "$PDFJS_DIR"
fi

# Download cv build
if [[ ! -d "$RESUME_DIR" || "$FORCE" == "true" ]]; then
  rm -rf "$RESUME_DIR"
  gh release download --repo egormkn/cv --dir "$RESUME_DIR" --pattern "*.pdf" --pattern "*.html"
fi
