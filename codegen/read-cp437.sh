#!/bin/sh
# Copy data from https://en.wikipedia.org/w/index.php?title=Code_page_437&action=edit&section=3
# then run this script to generate cp437.csv, file of format:
#  cp437-codepoint,unicode-codepoint,unicode-name
pbpaste|perl wikicp437.pl|python charnames.py>cp437.csv
