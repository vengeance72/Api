
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");


})

app.post("/",function(req,res){
  const query = req.body.CityName;

    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=33350a6ea5b4a8ee590a85326e494de1&units=metric"
  https.get(url,function(response){
  //  console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<h1>The weather description of "+query+" is: "+ weatherDesc +"</h1>");
      res.write("<h1>The temperature of "+query+" is: "+ temp +"degree celcius</h1>");
      res.write("<img src="+imageUrl+">");
      res.send();
    })
  })
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Running in port 3000");
});
