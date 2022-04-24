require("dotenv").config();
const express = require("express");
const app = express();    
const https = require("https");
const bodyParser= require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");  
})

app.post("/", function(req,res){
    const query = req.body.cityName;
    const appKey =  process.env.API_KEY; 
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&units="+unit+"&appid=" +appKey;
    https.get(url,function(response){
        response.on("data",function(data){
           // console.log(data);
          const weatherData =  JSON.parse(data);
          const temp = weatherData.main.temp;
          const description= weatherData.weather[0].description;
          const icon = weatherData.weather[0].icon;
          const imageUrl= "http://openweathermap.org/img/wn/" + icon + "@2x.png";
          res.write("<h1>The temp in " +query+ " is " + temp + " degree celcius</h1>");
          res.write("<p>" + description+ "</p>");
          res.write("<img src="+ imageUrl +">");

            res.send();
        })
    });
})


//server
app.listen(3000,function(){
    console.log("The server is running at port 3000 ");
})