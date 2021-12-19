using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.IO;
using System.Net;

namespace WebApplication4.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase
    {
        [HttpGet()]
        public string Get(string placeName)
        {
            dynamic parent = new JObject();
            parent.place_name = placeName;

            var food = CallElasticSearch("querries/food_query.json", placeName);
            parent.food = food;

            var budget = CallElasticSearch("querries/budget_query.json", placeName);
            parent.budget = budget;

            var accessibility = CallElasticSearch("querries/accessibility_query.json", placeName);
            parent.accessibility = accessibility;

            var generalInfo = CallElasticSearch("querries/general_info_query.json", placeName);
            parent.general_info = generalInfo;

            var timeToTravel = CallElasticSearch("querries/time_to_travel_query.json", placeName);
            parent.time_to_travel = timeToTravel;

            var transportation = CallElasticSearch("querries/transportation_query.json", placeName);
            parent.transportation = transportation;

            return Newtonsoft.Json.JsonConvert.SerializeObject(parent);
        }

        public string CallElasticSearch(string querypath, string placeName)
        {
            var httpWebRequest = (HttpWebRequest)WebRequest.Create("http://localhost:9200/places/_search?pretty");
            httpWebRequest.ContentType = "application/json";
            httpWebRequest.Method = "POST";

            using (var streamWriter = new StreamWriter(httpWebRequest.GetRequestStream()))
            {
                using (StreamReader r = new StreamReader(querypath))
                {
                    String json = r.ReadToEnd();
                    JObject jObject = Newtonsoft.Json.JsonConvert.DeserializeObject(json) as JObject;
                    JToken place = jObject.SelectToken("query.bool.must[0].match_phrase.place_name.query");
                    place.Replace(placeName);
                    streamWriter.Write(jObject.ToString());
                }
            }

            var response = (HttpWebResponse)httpWebRequest.GetResponse();
            var result = "";
            using (var streamReader = new StreamReader(response.GetResponseStream()))
            {
                result = streamReader.ReadToEnd();
            }
            return result;
        }
    }
}
