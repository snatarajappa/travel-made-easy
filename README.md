# Travel Made Easy
Travel Made Easy is a search engine for travel planning for local places near Salt Lake City.
Below are the folders and their purpose:

## Introduction

* Client - Contains code for React application.
* elasticsearch-6.2.4 - Contains Elasticsearch configurations and code.
* Web API - Contains code for ASP Core WebAPI (used as middleware).
* Web Scrapper - Contains Selenium code to scrape the web page and index the documents.

## Elasticsearch configuration
* Below curl command is used to create the index and mapping.
```curl
    $ curl -X PUT "localhost:9200/places?pretty" -H "Content-Type: application/json" -d"{\"mappings\":{\"place\":{\"properties\":{\"place_name\":{\"type\":\"text\"},\"contributions\":{\"type\":\"integer\"},\"visit_time\":{\"type\":\"keyword\"},\"reviewer_place\":{\"type\":\"keyword\"},\"reviewer\":{\"type\":\"keyword\"},\"review_title\":{\"type\":\"text\"},\"comment\":{\"type\":\"text\"}}}}}"
```

* Below curl command is used to index the documents.

```curl
    $ curl -X PUT "localhost:9200/dummy2/places/1?pretty" -H "Content-Type: application/json" -d" {\"place_name\":\"Big Cottonwood Canyon\",\"contributions\":411,\"visit_time\":\"Jul2011\",\"reviewer_place\":\"SaltLakeCity,UT\",\"comment\":\"Big Cottonwood has a lot of hiking options. With young kids, we love the Silver Lake walk at the base of Brighton ski resort. We have seen moose in the shallows here about a third of the time, munching away on the water plants. The rangers come out and keep you at a safe distance. There are dozens of trails for hikes into waterfalls, with widely varying levels of difficulty. Donut Falls is popular and can be crowded in summer. There are many internet sites that describe the various trails, and it is worth doing some research in advance. The Silver Fork Restaurant is about half way up the canyon. Its deck is very popular for summer weekend brunches and as an after ski place in the winter. The Porcupine Grill at the base of the Canyon in SLC is another after ski hot spot for beer, pizza, and pub food.\",\"reviewer\":\"JackB\",\"review_title\":\"greatvarietyofoutdooroptions\"}"
```

## Steps to run the application

* Go to elasticsearch-6.2.4 folder and run \bin\elasticsearch.bat
* Once elastic search is up and running, start WebAPI.
* Now, you are good to start the react application. Use below commands to run the react application. Note that below command works only for Powershell. If you are using different terminal, you have to form the command accordingly.

```sh
    $ ($env:REACT_APP_SERVER_URL = "http://localhost:64269/Search?placeName=") -and (npm start)
```
* You can search the webpage with place name "Big Cottonwood Canyon" as documents related to that web page are indexed already.

## Web application snapshot:

![image](https://user-images.githubusercontent.com/80569940/146696489-167e16e9-d968-4513-a70e-b78f9c1d12c8.png)


