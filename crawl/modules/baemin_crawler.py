from selenium import webdriver
import time
import requests
from crawl.modules.keywords import tech_stack
from bs4 import BeautifulSoup

def baemin_crawl():    # Chrome 드라이버 실행
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ko-KR")
    options.add_argument("--headless")
    options.add_argument("referer=https://recruit.navercorp.com/rcrt/")

    driver = webdriver.Chrome(options=options)

    url = "https://career.woowahan.com/?jobCodes=&employmentTypeCodes=&serviceSectionCodes=&careerPeriod=&keyword=&category=jobGroupCodes%3ABA005001#recruit-list"

    driver.execute_script(f"window.location.href=\"{url}\"")

    time.sleep(0.1)
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    content = soup.find("div", class_="recruit-list")
    jobs = content.find_all("a", class_="title")

    ids = []
    for job in jobs:
        try:
            ids.append(job.get("href").split("/")[2])
        except Exception:
            continue

    print(ids)

    ret = []
    for id in ids:
        detail_url = f"https://career.woowahan.com/recruitment/{id}/detail"
        driver.execute_script(f"window.location.href=\"{detail_url}\"")

        time.sleep(0.1)
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        detail = soup.find("div", class_="recruit-detail")
        title = detail.find("div", class_="title fr-view").text

        tech_tags = []
        for tag in tech_stack:
            if tag.lower() in detail.text.lower():
                tech_tags.append(tag)
        ret.append({
            "company": "baemin",
            "title": title,
            "techTags": tech_tags,
            "dueDate": "상시모집",
            "link": detail_url
        })

    driver.quit()
    return ret
if __name__ == "__main__":
    baemin_crawl()


