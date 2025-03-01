from selenium import webdriver
import time
from crawl.modules.keywords import tech_stack
from bs4 import BeautifulSoup

def dangn_crawl():
    # User-Agent 설정 (필요 시 변경)
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ko-KR")
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)

    url = "https://about.daangn.com/jobs/"

    driver.execute_script(f"window.location.href=\"{url}\"")
    time.sleep(0.1)
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    list_jobs = soup.find("ul", class_="c-jpGEAj")
    jobs_list = list_jobs.find_all("a")
    job_ids = []
    for job in jobs_list:
        job_ids.append(job.get("href"))
    ret = []
    for id in job_ids:
        detail_url = f"https://about.daangn.com{id}"
        driver.execute_script(f"window.location.href=\"{detail_url}\"")
        time.sleep(0.1)
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        title = soup.find("h1")
        detail = soup

        tech_tags = []
        for tag in tech_stack:
            if tag.lower() in detail.text.lower():
                tech_tags.append(tag)
        ret.append({
            "company": "dangn",
            "title": title.text,
            "techTags": tech_tags,
            "dueDate": "상시모집",
            "link": detail_url
        })


    driver.quit()
    return ret


if __name__ == "__main__":
    for ret in dangn_crawl():
        print(ret)