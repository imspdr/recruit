from selenium import webdriver
import time
from bs4 import BeautifulSoup

def naver_crawl():
    # Chrome 드라이버 실행
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 ko-KR")
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)

    # 크롤링할 웹사이트 열기
    url = "https://recruit.navercorp.com/rcrt/list.do?srchClassCd=1000000&lang=ko"
    driver.execute_script(f"window.location.href=\"{url}\"")

    # 스크롤 실행
    last_height = driver.execute_script("return document.body.scrollHeight")

    time.sleep(3)
    for _ in range(1000):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(0.1)

        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    html = driver.page_source

    driver.quit()

    soup = BeautifulSoup(html, "html.parser")

    ret = []
    cards = soup.find_all("li", class_="card_item")
    for card in cards:
        try:
            title = card.find("h4")
            info = card.find("dl", class_="card_info").text.split("\n")
            id = card.find("a", class_="card_link").get("onclick")

            key = id.split("show('")[1].split("'")[0]
            ret.append({
                "company": "naver",
                "title": title.text,
                "sub": info[-2],
                "link": f"https://recruit.navercorp.com/rcrt/view.do?annoId={key}"})
        except Exception:
            continue

    return ret


if __name__ == "__main__":
    for ret in naver_crawl():
        print(ret)