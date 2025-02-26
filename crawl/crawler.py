from crawl.modules.naver_crawler import naver_crawl
from crawl.modules.kakao_crawler import kakao_crawl
from crawl.modules.line_crawler import line_crawl

import json
import os
from datetime import datetime

last_result = []

for ret in naver_crawl():
    last_result.append(ret)

for ret in kakao_crawl():
    last_result.append(ret)

for ret in line_crawl():
    last_result.append(ret)

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
filename = f"data_{timestamp}.json"

with open(os.path.join("../src/store/", filename), "w", encoding="utf-8") as f:
    json.dump(last_result, f, ensure_ascii=False, indent=4)


