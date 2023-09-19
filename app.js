const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

// Settign View engine
app.set('view engine', 'ejs');

// Autentication to let body-parser work
app.use(bodyParser.urlencoded({extended: true}));

// Get Static pages like css js images
app.use(express.static("public"));

// port
const port = process.env.PORT || 3000;

let location;

app.get("/", (req,res)=>{
    res.render("index")
})




app.get('/result', (req,res)=>{

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=4e2f3cff62ac3b0aa61f9ab1f840cf46&units=metric";
    
    https.get(url, (response)=>{
        response.on("data", (d)=>{            
            const weatherData = JSON.parse(d);
            const temp = weatherData.main.temp;
            const city = weatherData.name
            const windSpeed = weatherData.wind.speed
            const hummidity = weatherData.main.humidity
            const icons = weatherData.weather[0].icon
            const iconUrl = "https://openweathermap.org/img/wn/"+ icons +"@2x.png"

            res.render('result', data = {
                temp: Math.floor(temp),
                city: city,
                windSpeed: windSpeed,
                hummidity: hummidity,
                icon: iconUrl
            });

        })
    })
   
})



app.post("/", (req,res)=>{
    location = req.body.cityName;
    console.log(location)
    res.redirect("/result");
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})