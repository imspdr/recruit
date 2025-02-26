import requests
from crawl.modules.keywords import tech_stack, job_keywords
from bs4 import BeautifulSoup

# User-Agent 설정 (필요 시 변경)
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

url = "https://recruit.navercorp.com/rcrt/list.do?srchClassCd=1000000"
response = requests.get(url, headers=HEADERS)
soup = BeautifulSoup(response.text, "html.parser")

links = soup.find_all("a", class_="card_link")
onclick_values = [link.get("onclick").split("(\'")[1].split("\')")[0] for link in links]

ret = []
for key in onclick_values:
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


