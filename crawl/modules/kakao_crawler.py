from selenium import webdriver
import time
from crawl.modules.keywords import tech_stack
from bs4 import BeautifulSoup

def kakao_crawl():
    # User-Agent 설정 (필요 시 변경)
    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ko-KR")
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)

    url = "https://careers.kakao.com/jobs?skillSet=&part=TECHNOLOGY&company=ALL&keyword=&employeeType=&page="

    job_ids = []
    for i in range(1, 5):
        driver.execute_script(f"window.location.href=\"{url + str(i)}\"")
        time.sleep(1)
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        list_jobs = soup.find("ul", class_="list_jobs")
        links = list_jobs.find_all("a") if list_jobs else []
        for link in links:
            try:
                job_ids.append(link.get("href").split("jobs/")[1].split("?")[0])
            except Exception:
                continue

    ret = []
    for id in job_ids:
        detail_url = f"https://careers.kakao.com/jobs/{id}"

        driver.execute_script(f"window.location.href=\"{detail_url}\"")
        time.sleep(1)
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        title = soup.find("strong", class_="tit_jobs")
        detail = soup.find("div", class_="area_cont")
        try:
            due = soup.find("dl", class_="list_info").text.split("영입마감일")[1].split("근무")[0]
        except Exception:
            due = "-"

        tech_tags = []
        for tag in tech_stack:
            if tag.lower() in detail.text.lower():
                tech_tags.append(tag)
        ret.append({
            "company": "kakao",
            "title": title.text,
            "techTags": tech_tags,
            "dueDate": due,
            "link": detail_url
        })


    driver.quit()
    return ret


if __name__ == "__main__":
    kakao_crawl()