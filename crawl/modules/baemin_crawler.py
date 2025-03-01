from selenium import webdriver
import time
from bs4 import BeautifulSoup

def baemin_crawl():
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ko-KR")
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)

    url = "https://career.woowahan.com/?jobCodes=&employmentTypeCodes=&serviceSectionCodes=&careerPeriod=&keyword=&category=jobGroupCodes%3ABA005001#recruit-list"

    driver.execute_script(f"window.location.href=\"{url}\"")

    time.sleep(3)
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    jobs = soup.find_all("a", class_="title")

    ret = []

    for job in jobs:
        try:
            title = job.find("p").text
            link = "https://career.woowahan.com" + job.get("href")
            ret.append({
                "company": "baemin",
                "title": title,
                "sub": "",
                "link": link
            })
        except Exception:
            continue

    driver.quit()
    return ret

if __name__ == "__main__":
    for ret in baemin_crawl():
        print(ret)


