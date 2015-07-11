#!/usr/bin/python
import unicodedata
import sys

while True:
    line = sys.stdin.readline().strip()
    if line=='': break
    uni, cp437 = line.split(",")
    if uni=='': continue

    #print [uni]
    ch = unichr(int(uni,16))
    #print [ch,uni]
    name = unicodedata.name(ch)
    print ",".join((cp437,uni,name))
