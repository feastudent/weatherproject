//jshint esversion:6

const express = require('express');
const app = express();
const body = require('body-parser');
app.use(body.urlencoded({extended: true})); //urlencoded is for parsing forms
const https = require("https"); //native
const { json } = require('express');

const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.sendFile(__dirname+"\\index.html")
});

app.post("/", (req,res) => {
    var city = req.body.cityInput;
    var appid = "373784f77b36d0e054b0c21a72c15731";
    const units = "metric"
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+units;
    
    var result = "";
    var statusCode = "";
    https.get(url, (res2) => {
            
            statusCode = res2.statusCode;

            //console.log(res2);
            res2.on("data",(data) =>{
                var resultData = JSON.parse(data) //show the whole returned message
                console.log("---> JSON: "+JSON.stringify(resultData));
                const tempData = resultData.main.temp; //show only the temperature
                const feelsLike = resultData.main.feels_like;
                const description = resultData.weather[0].description;
                const iconCode = resultData.weather[0].icon;

                const output = "<h1>City: "+city+", Temp: "+tempData+", FeelsLike: "+feelsLike+", Description: "+description+"</h1>";
                console.log(output);
                result = output;
                res.write(result);
                res.write("<p>The server is up and running... "+statusCode+"</p>");
                res.write("<img src='http://openweathermap.org/img/wn/"+iconCode+"@2x.png'/>");
                res.send();
            });

            
    });
});

/*
app.get("/", (req,res) => {
    console.log("GET");
    var appid = "373784f77b36d0e054b0c21a72c15731";
    const query = "Tampa";
    const units = "metric"
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+units;
    
    var result = "";
    var statusCode = "";
    https.get(url, (res2) => {
            
            statusCode = res2.statusCode;

            //console.log(res2);
            res2.on("data",(data) =>{
                var resultData = JSON.parse(data) //show the whole returned message
                console.log("---> JSON: "+JSON.stringify(resultData));
                const tempData = resultData.main.temp; //show only the temperature
                const feelsLike = resultData.main.feels_like;
                const description = resultData.weather[0].description;
                const iconCode = resultData.weather[0].icon;

                const output = "<h1>Temp: "+tempData+", FeelsLike: "+feelsLike+", Description: "+description+", IconCode: "+iconCode+"</h1>";
                console.log(output);
                result = output;
                res.write(result);
                res.write("<p>The server is up and running... "+statusCode+"</p>");
                res.write("<img src='http://openweathermap.org/img/wn/"+iconCode+"@2x.png'/>");
                res.send();
            });

            
    })
    
});
*/

app.post("/", (req,res) => {
    console.log("POST");
    res.send("Thank you for posting your personal mesurements. [Weight: "+weight+" + Height:"+height+" = BMI:"+bmi+"]");
});

app.listen(PORT, () => console.log('Server is listening on port: '+PORT));
