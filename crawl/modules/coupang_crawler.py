import time
import requests
from crawl.modules.keywords import tech_stack
from bs4 import BeautifulSoup

def coupang_crawl():
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 ko-KR"
    }
    # 크롤링할 웹사이트 열기
    url = f"https://www.coupang.jobs/kr/jobs/?page={1}&search=engineer&location=South%20Korea&location=Seoul,%20South%20Korea&pagesize=50#results"

    response = requests.get(url, headers=HEADERS)
    soup = BeautifulSoup(response.text, "html.parser")
    job_list = soup.find("div", class_="grid job-listing")
    total_num = job_list.get("data-results")
    cards = job_list.find_all("div", class_="card card-job")
    ids = []
    for card in cards:
        try:
            carda = card.find("a")
            if carda:
                ids.append(carda.get("href").split("jobs/")[1].split("/")[0])
        except Exception:
            continue
    rest = int(total_num) - 50
    if int(total_num) - 50 > 0:
        for i in range(rest // 50 + 1):
            time.sleep(0.1)
            url = f"https://www.coupang.jobs/kr/jobs/?page={i + 2}&search=engineer&location=South%20Korea&location=Seoul,%20South%20Korea&pagesize=50#results"
            response = requests.get(url, headers=HEADERS)
            soup = BeautifulSoup(response.text, "html.parser")
            job_list = soup.find("div", class_="grid job-listing")
            cards = job_list.find_all("div", class_="card card-job")
            for card in cards:
                try:
                    carda = card.find("a")
                    if carda:
                        ids.append(carda.get("href").split("jobs/")[1].split("/")[0])
                except Exception:
                    continue

    ret = []
    for id in ids:
        time.sleep(0.1)
        detail_url = "https://www.coupang.jobs/kr/jobs/" + id
        response = requests.get(detail_url, headers=HEADERS)
        soup = BeautifulSoup(response.text, "html.parser")
        title = soup.find("div", class_="container job-detail").get("data-jobtitle")
        detail = soup.find("div", class_="jobdetail-grid-wrapper")

        tech_tags = []
        for tag in tech_stack:
            if tag.lower() in detail.text.lower():
                tech_tags.append(tag)
        ret.append({
            "company": "coupang",
            "title": title,
            "techTags": tech_tags,
            "dueDate": "상시모집",
            "link": detail_url
        })
    return ret
if __name__ == "__main__":
    coupang_crawl()


