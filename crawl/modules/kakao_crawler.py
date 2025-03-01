from selenium import webdriver
import time
from bs4 import BeautifulSoup

def kakao_crawl():
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ko-KR")
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)

    url = "https://careers.kakao.com/jobs?skillSet=&part=TECHNOLOGY&company=ALL&keyword=&employeeType=&page="

    ret = []
    for i in range(1, 5):
        driver.execute_script(f"window.location.href=\"{url + str(i)}\"")
        time.sleep(3)
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        try:
            list_jobs = soup.find("ul", class_="list_jobs").find_all("a")
            for job in list_jobs:
                title = job.find("h4", class_="tit_jobs").text
                ret.append({
                    "company": "kakao",
                    "title": title,
                    "sub": "",
                    "link": "https://careers.kakao.com" + job.get("href")
                })
        except Exception:
            continue
    driver.quit()
    return ret


if __name__ == "__main__":
    for ret in kakao_crawl():
        print(ret)