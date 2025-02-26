from selenium import webdriver
import time
import requests
from crawl.modules.keywords import tech_stack, job_keywords
from bs4 import BeautifulSoup


# Chrome 드라이버 실행
options = webdriver.ChromeOptions()
options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ko-KR")
options.add_argument("--headless")
options.add_argument("referer=https://recruit.navercorp.com/rcrt/")

driver = webdriver.Chrome(options=options)

# 크롤링할 웹사이트 열기
url = "https://recruit.navercorp.com/rcrt/list.do?srchClassCd=1000000&lang=ko"
driver.execute_script(f"window.location.href=\"{url}\"")



# 스크롤 실행
last_height = driver.execute_script("return document.body.scrollHeight")

time.sleep(10)
for _ in range(1000):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(1)

    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height

html = driver.page_source

# User-Agent 설정 (필요 시 변경)
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 ko-KR"
}

soup = BeautifulSoup(html, "html.parser")

links = soup.find_all("a", class_="card_link")

onclick_values = []
for link in links:
    linkval = link.get("onclick")
    splited = linkval.split("\'")
    try:
        if len(splited) > 1:
            onclick_values.append(splited[1])
        else:
            onclick_values.append(linkval.split("(")[1].split(")")[0])
    except Exception as e:
        print(e)

ret = []
for key in onclick_values:
    time.sleep(0.1)
    detail_url = f"https://recruit.navercorp.com/rcrt/view.do?annoId={key}"

    response = requests.get(detail_url, headers=HEADERS)
    soup = BeautifulSoup(response.text, "html.parser")
    detail = soup.find("div", class_="card_wrap")
    if detail:
        title = detail.find("h4", class_="card_title")
        info_texts = detail.find_all("dd", class_="info_text")

        job_tags = []
        for job in job_keywords:
            if job.lower() in detail.text.lower():
                job_tags.append(job)
        tech_tags = []
        for tag in tech_stack:
            if tag.lower() in detail.text.lower():
                tech_tags.append(tag)
        ret.append({
            "title": title.text,
            "jobTag": job_tags,
            "techTags": tech_tags,
            "dueDate": info_texts[-1].text,
            "link": detail_url
        })

for re in ret:
    print(re)