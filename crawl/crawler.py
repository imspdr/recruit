from crawl.modules.dangn_crawler import dangn_crawl
from crawl.modules.naver_crawler import naver_crawl
from crawl.modules.kakao_crawler import kakao_crawl
from crawl.modules.line_crawler import line_crawl
from crawl.modules.coupang_crawler import coupang_crawl
from crawl.modules.baemin_crawler import baemin_crawl
from crawl.modules.toss_crawler import toss_crawl

import json
import os


last_result = []

for ret in naver_crawl():
    last_result.append(ret)

for ret in kakao_crawl():
    last_result.append(ret)

for ret in line_crawl():
    last_result.append(ret)

# for ret in coupang_crawl():
#     last_result.append(ret)

for ret in baemin_crawl():
    last_result.append(ret)

for ret in dangn_crawl():
    last_result.append(ret)

for ret in toss_crawl():
    last_result.append(ret)


filename = "data.json"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

store_path = os.path.join(BASE_DIR, "../src/store/")

with open(os.path.join(store_path, filename), "w", encoding="utf-8") as f:
    json.dump(last_result, f, ensure_ascii=False, indent=4)


