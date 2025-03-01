from selenium import webdriver
import time
from bs4 import BeautifulSoup

def line_crawl():
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ko-KR")
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)

    # 크롤링할 웹사이트 열기
    url = "https://careers.linecorp.com/ko/jobs?ca=Engineering&ci=Gwacheon,Bundang,Seoul&co=East%20Asia"
    driver.execute_script(f"window.location.href=\"{url}\"")
    time.sleep(3)
    html = driver.page_source
    driver.quit()
    soup = BeautifulSoup(html, "html.parser")

    ret = []
    job_list = soup.find("ul", class_ = "job_list")
    if job_list:
        jobs = job_list.find_all("li")
        for job in jobs:
            try:
                title = job.find("h3").text
                link = "https://careers.linecorp.com" + job.find("a").get("href")
                ret.append({
                    "company": "line",
                    "title": title,
                    "sub": "",
                    "link": link
                })
            except Exception:

                continue


    return ret


if __name__ == "__main__":
    for ret in line_crawl():
        print(ret)