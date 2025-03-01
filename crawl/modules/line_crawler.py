from selenium import webdriver
import requests
import time
from crawl.modules.keywords import tech_stack
from bs4 import BeautifulSoup

def line_crawl():
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 ko-KR"
    }
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ko-KR")
    options.add_argument("--headless")
    options.add_argument("referer=https://recruit.navercorp.com/rcrt/")

    driver = webdriver.Chrome(options=options)

    # 크롤링할 웹사이트 열기
    url = "https://careers.linecorp.com/ko/jobs?ca=Engineering&ci=Gwacheon,Bundang,Seoul&co=East%20Asia"
    driver.execute_script(f"window.location.href=\"{url}\"")
    time.sleep(0.1)
    html = driver.page_source
    driver.quit()
    soup = BeautifulSoup(html, "html.parser")
    job_list = soup.find("ul", class_ = "job_list")
    job_ids = []
    if job_list:
        job_as = job_list.find_all("a", )
        for atag in job_as:
            job_ids.append(atag.get("href").split("/")[-1])

    ret = []
    for id in job_ids:
        time.sleep(0.1)
        detail_url = f"https://careers.linecorp.com/ko/jobs/{id}"
        response = requests.get(detail_url, headers=HEADERS)
        response.encoding = response.apparent_encoding
        soup = BeautifulSoup(response.text, "html.parser")
        title = soup.find("title")
        detail = soup.find("div", class_="content_inner")
        tech_tags = []
        for tag in tech_stack:
            if tag.lower() in detail.text.lower():
                tech_tags.append(tag)
        ret.append({
                    "company": "line",
                    "title": title.text,
                    "techTags": tech_tags,
                    "dueDate": "상시모집",
                    "link": detail_url
                })

    return ret
