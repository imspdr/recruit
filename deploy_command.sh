#!/bin/bash

# Python 스크립트 실행
export PYTHONPATH=$PYTHONPATH:$(pwd)
python3 crawl/crawler.py

# npm 빌드 실행
npm run build

# Git commit과 push
git add .
git commit -m "daily commit"
git push origin
