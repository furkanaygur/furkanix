from django.http import JsonResponse,HttpResponse
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

import environ
env = environ.Env()
environ.Env.read_env()

def index(request):
    return HttpResponse(f"Django is working. Please use {request.META['HTTP_HOST']}/scrap/{{keyword}} to scraping.")

def getOnlyUrl(attribute):
    # INFO example attribute = "window.location='/etkinlik/1SF59/TURKIYE/tr'"
    url = attribute.split('=')[1]
    url = url.replace("'", "")[1:]  

    if url.split("/")[0] != "etkinlik":
        return "empty"

    return url

def scrap(request, keyword):
    chromeDriverPath = env("CHROMEDIRVER_PATH")

    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    driver = webdriver.Chrome(chromeDriverPath+'/chromedriver',chrome_options=chrome_options)
    
    time.sleep(1)

    searchUrl = env("SEARCH_URL")
    driver.get(f"{searchUrl}{keyword}#{keyword}")

    time.sleep(2)

    fullUrls = []
    events = driver.find_elements_by_css_selector(".searchLinkDiv")


    mainUrl = env("MAIN_URL")
    if len(events) > 1:
        for event in events:
            if event.get_attribute("onclick") != None:
                cleanedUrl = getOnlyUrl(event.get_attribute("onclick"))

                if cleanedUrl != "empty":
                    fullUrls.append(f"{mainUrl}{cleanedUrl}")

    scrapedEvents = []
    for url in fullUrls:
        driver.get(url)
        time.sleep(3)

        try:
            title = driver.find_element_by_xpath("//*[@id='eventnameh1']/span").text
        except:
            title = ""

        try:
            imageUrl = driver.find_element_by_css_selector("#ei_header > div.grid_7.alpha.eventimage.col-xs-12.plrM0 > img").get_attribute("src")

        except:
            imageUrl = ""
        
        try:
            date = driver.find_element_by_css_selector("#eventdatefields > h2").get_attribute("content")
        except:
            date = ""

        try:
            place = driver.find_element_by_xpath("//*[@id='hidablelocation']/a/span[1]").text                                              
        except:
            place = ""

        try:
            city = driver.find_element_by_xpath("//*[@id='hidablelocation']/a/span[2]").text
        except:
            city = ""

        content = driver.find_element_by_xpath("//*[@id='event_info']/div/div/div[1]/div[2]").text

        event = {
            'title' : title,
            'page_url' : url,
            'image_url' : imageUrl,
            'date' : date,
            'place' : place,
            'city' : city,
            'content' : content,
        }

        scrapedEvents.append(event)

    driver.quit()
    return JsonResponse(scrapedEvents, safe=False)