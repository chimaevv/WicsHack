import json
import os
import http.client


def serper_search(query, n_results=10):
    conn = http.client.HTTPSConnection("google.serper.dev")
    payload = json.dumps({"q": query, "num": n_results})  # request top 10 results
    headers = {
        "X-API-KEY": os.getenv("SERPER_API_KEY"),
        "Content-Type": "application/json",
    }
    conn.request("POST", "/search", payload, headers)
    res = conn.getresponse()
    data = res.read()
    results = json.loads(data.decode("utf-8"))
    # print("serper results: ", rsesults)
    return results.get("organic", [])


def serper_scrape(url):
    conn = http.client.HTTPSConnection("scrape.serper.dev")
    payload = json.dumps({"url": url})
    headers = {
        "X-API-KEY": os.getenv("SERPER_API_KEY"),
        "Content-Type": "application/json",
    }
    conn.request("POST", "/", payload, headers)
    res = conn.getresponse()
    data = res.read()
    try:
        scraped_data = json.loads(data.decode("utf-8"))
        # The scraped content might be in scraped_data['content'] or scraped_data['text'] depending on the API response
        return scraped_data.get("content", "") or scraped_data.get("text", "")
    except:
        return ""
    
with open("reddit.txt", 'a') as file:
    file.write(serper_scrape("https://www.reddit.com/r/relationship_advice/"))