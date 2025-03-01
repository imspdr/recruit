from selenium import webdriver
import time
from crawl.modules.keywords import tech_stack
from bs4 import BeautifulSoup

def toss_crawl():
    # User-Agent 설정 (필요 시 변경)
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ko-KR")
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)

    url = "https://toss.im/career/jobs?category=Data%20Analysis%2CData%20Engineering%2CML%2CData%20Managing%2CData%2CBackend%2CFrontend%2CInfra%2CQA%2CFull%20Stack%2CApp%2CEngineering"

    driver.execute_script(f"window.location.href=\"{url}\"")
    time.sleep(0.1)
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    list_jobs = soup.find("div", class_="css-16ht878")
    job_divs = list_jobs.find_all("div")

    job_ids = []

    ret = []
    for job in job_divs:
        href_job = job.get("href")
        if href_job:
            try:
                job_ids.append(href_job)
                detail_url = f"https://toss.im{href_job}"
                title = job.find("span", class_="typography typography--h5 typography--bold color--grey700").text
                detail = job.find("span", class_="typography typography--p typography--regular color--grey700").text
                tech_tags = []
                for tag in tech_stack:
                    if tag.lower() in detail.lower():
                        tech_tags.append(tag)
                ret.append({
                    "company": "toss",
                    "title": title,
                    "techTags": tech_tags,
                    "dueDate": "-",
                    "link": detail_url
                })
            except Exception:
                continue

    driver.quit()
    return ret


if __name__ == "__main__":
    for ret in toss_crawl():
        print(ret)