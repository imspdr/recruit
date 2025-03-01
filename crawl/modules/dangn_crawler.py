from selenium import webdriver
import time
from bs4 import BeautifulSoup

def dangn_crawl():
    # User-Agent 설정 (필요 시 변경)
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ko-KR")
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)

    url = "https://about.daangn.com/jobs/"

    driver.execute_script(f"window.location.href=\"{url}\"")
    time.sleep(1)
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    list_jobs = soup.find("ul", class_="c-jpGEAj")
    jobs_list = list_jobs.find_all("a")

    ret = []
    for job in jobs_list:
        try:
            ret.append({
                "company": "dangn",
                "title": job.find("h3").text,
                "sub": "",
                "link": "https://about.daangn.com" + job.get("href")
            })
        except Exception:
            continue
    driver.quit()
    return ret


if __name__ == "__main__":
    for ret in dangn_crawl():
        print(ret)