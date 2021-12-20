# Travel Made Easy
A Search Engine For Travel Planning

# Introduction
This is a search engine for local places near salt lake city.

# Technologies
We have used ReactJS for the front end and elastic search as the search engine. ASP Core WebAPI is used as middleware.
An index named 'places' is created in the elastic search using below curl command.
Also, we have used selenium with java to scrape the web page and index the documents.

curl -X PUT "localhost:9200/places?pretty" -H "Content-Type: application/json" -d"{\"mappings\":{\"place\":{\"properties\":{\"place_name\":{\"type\":\"text\"},\"contributions\":{\"type\":\"integer\"},\"visit_time\":{\"type\":\"keyword\"},\"reviewer_place\":{\"type\":\"keyword\"},\"reviewer\":{\"type\":\"keyword\"},\"review_title\":{\"type\":\"text\"},\"comment\":{\"type\":\"text\"}}}}}"

You can update index the document using below curl command.

curl -X PUT "localhost:9200/dummy2/places/1?pretty" -H "Content-Type: application/json" -d" {\"place_name\":\"Big Cottonwood Canyon\",\"contributions\":411,\"visit_time\":\"Jul2011\",\"reviewer_place\":\"SaltLakeCity,UT\",\"comment\":\"Big Cottonwood has a lot of hiking options. With young kids, we love the Silver Lake walk at the base of Brighton ski resort. We have seen moose in the shallows here about a third of the time, munching away on the water plants. The rangers come out and keep you at a safe distance. There are dozens of trails for hikes into waterfalls, with widely varying levels of difficulty. Donut Falls is popular and can be crowded in summer. There are many internet sites that describe the various trails, and it is worth doing some research in advance. The Silver Fork Restaurant is about half way up the canyon. Its deck is very popular for summer weekend brunches and as an after ski place in the winter. The Porcupine Grill at the base of the Canyon in SLC is another after ski hot spot for beer, pizza, and pub food.\",\"reviewer\":\"JackB\",\"review_title\":\"greatvarietyofoutdooroptions\"}"

# Installation

Go to elasticsearch folder and run \bin\elasticsearch.bat
Once elastic search is up and running, start WebAPI.
Now, you are good to start the react application. Use below commands to run the react application.

($env:REACT_APP_SERVER_URL = "http://localhost:64269/Search?placeName=") -and (npm start)

You can search the webpage with place name "Big Cottonwood Canyon" as documents related to that web page are indexed already.

Web application snapshot:

![image](https://user-images.githubusercontent.com/80569940/146696489-167e16e9-d968-4513-a70e-b78f9c1d12c8.png)


