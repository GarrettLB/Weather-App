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

var mainIcon = document.querySelector("#mainIcon")
var card1img = document.querySelector("#card-1-img")
var card2img = document.querySelector("#card-2-img")
var card3img = document.querySelector("#card-3-img")
var card4img = document.querySelector("#card-4-img")
var card5img = document.querySelector("#card-5-img")

var card1 = $("#card-1")
var card2 = $("#card-2")
var card3 = $("#card-3")
var card4 = $("#card-4")
var card5 = $("#card-5")

var card1date = $("#card-1-date")
var card1temp = $("#card-1-temp")
var card1wind = $("#card-1-wind")
var card1humidity = $("#card-1-humidity")

var card2date = $("#card-2-date")
var card2temp = $("#card-2-temp")
var card2wind = $("#card-2-wind")
var card2humidity = $("#card-2-humidity")

var card3date = $("#card-3-date")
var card3temp = $("#card-3-temp")
var card3wind = $("#card-3-wind")
var card3humidity = $("#card-3-humidity")

var card4date = $("#card-4-date")
var card4temp = $("#card-4-temp")
var card4wind = $("#card-4-wind")
var card4humidity = $("#card-4-humidity")

var card5date = $("#card-5-date")
var card5temp = $("#card-5-temp")
var card5wind = $("#card-5-wind")
var card5humidity = $("#card-5-humidity")




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
        var icon = data.current.weather[0].icon
        console.log(icon)

        var iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png"

        
        console.log(data);

        mainIcon.setAttribute("src", iconUrl)
        selectedCity.text(name + " "+ moment)
        temp.text("Temp: " + data.current.temp)
        wind.text("Wind: " + data.current.wind_speed + " MPH")
        humidity.text("Humidity: " + data.current.humidity + " %")
        UV.text("UV Index: " + data.current.uvi)

        Cards(data)
      });
}

function Cards(data) {

  var moment1 = window.moment(data.daily[1].dt, "X").format("MM/DD/YYYY")
  var moment2 = window.moment(data.daily[2].dt, "X").format("MM/DD/YYYY")
  var moment3 = window.moment(data.daily[3].dt, "X").format("MM/DD/YYYY")
  var moment4 = window.moment(data.daily[4].dt, "X").format("MM/DD/YYYY")
  var moment5 = window.moment(data.daily[5].dt, "X").format("MM/DD/YYYY")

  var icon1 = data.daily[1].weather[0].icon
  var icon2 = data.daily[2].weather[0].icon
  var icon3 = data.daily[3].weather[0].icon
  var icon4 = data.daily[4].weather[0].icon
  var icon5 = data.daily[5].weather[0].icon

  var iconUrl1 = "http://openweathermap.org/img/wn/" + icon1 + ".png"
  var iconUrl2 = "http://openweathermap.org/img/wn/" + icon2 + ".png"
  var iconUrl3 = "http://openweathermap.org/img/wn/" + icon3 + ".png"
  var iconUrl4 = "http://openweathermap.org/img/wn/" + icon4 + ".png"
  var iconUrl5 = "http://openweathermap.org/img/wn/" + icon5 + ".png"

  card1date.text(moment1)
  card2date.text(moment2)
  card3date.text(moment3)
  card4date.text(moment4)
  card5date.text(moment5)

  card1img.setAttribute("src", iconUrl1)
  card2img.setAttribute("src", iconUrl2)
  card3img.setAttribute("src", iconUrl3)
  card4img.setAttribute("src", iconUrl4)
  card5img.setAttribute("src", iconUrl5)

  card1temp.text("Temp: " + data.daily[1].temp.day)
  card2temp.text("Temp: " + data.daily[2].temp.day)
  card3temp.text("Temp: " + data.daily[3].temp.day)
  card4temp.text("Temp: " + data.daily[4].temp.day)
  card5temp.text("Temp: " + data.daily[5].temp.day)

  card1wind.text("Wind: " + data.daily[1].wind_speed + " MPH")
  card2wind.text("Wind: " + data.daily[2].wind_speed + " MPH")
  card3wind.text("Wind: " + data.daily[3].wind_speed + " MPH")
  card4wind.text("Wind: " + data.daily[4].wind_speed + " MPH")
  card5wind.text("Wind: " + data.daily[5].wind_speed + " MPH")

  card1humidity.text("Humidity: " + data.daily[1].humidity + " %")
  card2humidity.text("Humidity: " + data.daily[2].humidity + " %")
  card3humidity.text("Humidity: " + data.daily[3].humidity + " %")
  card4humidity.text("Humidity: " + data.daily[4].humidity + " %")
  card5humidity.text("Humidity: " + data.daily[5].humidity + " %")
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