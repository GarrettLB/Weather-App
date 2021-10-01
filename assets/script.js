// WHEN I search for a city                                                                                         \
// THEN I am presented with current and future conditions for that city and that city is added to the search history/

// WHEN I view current weather conditions for that city                                                                         \
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity,the wind speed, and the UV index                                                                                             /

// WHEN I view the UV index                                                                                 \
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe/

// WHEN I view future weather conditions for that city                                                                             \
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity                                                                                                /

// WHEN I click on a city in the search history                              \
// THEN I am again presented with current and future conditions for that city/

// * Uses the OpenWeather API to retrieve weather data.

// * Uses `localStorage` to store persistent data.


//         ---API---
// e219d48ca531f5879866bfcf8c707612
// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


// SELECTORS
var cityName = $("#cityName")
var searchBtn = $("#searchBtn")
var selectedCity = $("#selectedCity")
var btnUl = $("#btnUl")
var temp = $("#temp")
var wind = $("#wind")
var humidity = $("#humidity")
var UV = $("#UV")




function Search() {
    
    var city = cityName.val()

    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e219d48ca531f5879866bfcf8c707612"

    fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var lat = data.coord.lat
        var lon = data.coord.lon
        var name = data.name

        DisplayCity(name,lat,lon)
        LocalStorage(name,lat,lon)
        NewButton(name,lat,lon)
      });
}

function LocalStorage(name,lat,lon) {

    var Cities = JSON.parse(localStorage.getItem("Cities"));

    if (Cities === null) {
        Cities = []
    }

    Cities.push(name + "/" + lat + "/" + lon)

    localStorage.setItem("Cities", JSON.stringify(Cities))
}

function NewButton(name,lat,lon) {

    var btn = document.createElement("button")

    btn.textContent = name
    btn.setAttribute("class", "button")
    btn.setAttribute("lat", lat)
    btn.setAttribute("lon", lon)

    btnUl.append(btn)
    console.log(btn.getAttribute("lat"))
    console.log(btn.getAttribute("lon"))
}

function DisplayCity(name,lat,lon) {

    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&units=imperial&exclude=minutely,hourly,alerts&appid=e219d48ca531f5879866bfcf8c707612"

    fetch(forecastUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        var dt = data.daily[0].dt
        var moment = window.moment(dt, "X").format("MM/DD/YYYY")
        
        console.log(data);

        selectedCity.text(name + " "+ moment)
        temp.text("Temp: " + data.current.temp)
        wind.text("Wind: " + data.current.wind_speed + " MPH")
        humidity.text("Humidity: " + data.current.humidity + " %")
        UV.text("UV Index: " + data.current.uvi)
      });
}

function ExistingSearch(event) {
    
    var name = event.target.textContent
    var lat = event.target.getAttribute("lat")
    var lon = event.target.getAttribute("lon")

    DisplayCity(name,lat,lon)
}

function LoadButtons() {
    
    var Cities = JSON.parse(localStorage.getItem("Cities"))

    if (Cities != null) {

        for (let i of Cities) {

            var split = i.split("/")

            var btn = document.createElement("button")

            btn.textContent = split[0]
            btn.setAttribute("class", "button")
            btn.setAttribute("lat", split[1])
            btn.setAttribute("lon", split[2])

            btnUl.append(btn)
        }
    }
}

btnUl.on("click", ".button", ExistingSearch)
searchBtn.on("click", Search)
LoadButtons()