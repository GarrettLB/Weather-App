// SELECTORS
var cityName = $("#cityName")
var searchBtn = $("#searchBtn")
var selectedCity = $("#selectedCity")
var btnUl = $("#btnUl")
var temp = $("#temp")
var wind = $("#wind")
var humidity = $("#humidity")
var UV = $("#UV")
var UVP = $("#UVP")

// selectors for icons
var mainIcon = document.querySelector("#mainIcon")
var card1img = document.querySelector("#card-1-img")
var card2img = document.querySelector("#card-2-img")
var card3img = document.querySelector("#card-3-img")
var card4img = document.querySelector("#card-4-img")
var card5img = document.querySelector("#card-5-img")

// card-1
var card1date = $("#card-1-date")
var card1temp = $("#card-1-temp")
var card1wind = $("#card-1-wind")
var card1humidity = $("#card-1-humidity")

// card-2
var card2date = $("#card-2-date")
var card2temp = $("#card-2-temp")
var card2wind = $("#card-2-wind")
var card2humidity = $("#card-2-humidity")

// card-3
var card3date = $("#card-3-date")
var card3temp = $("#card-3-temp")
var card3wind = $("#card-3-wind")
var card3humidity = $("#card-3-humidity")

// card-4
var card4date = $("#card-4-date")
var card4temp = $("#card-4-temp")
var card4wind = $("#card-4-wind")
var card4humidity = $("#card-4-humidity")

// card-5
var card5date = $("#card-5-date")
var card5temp = $("#card-5-temp")
var card5wind = $("#card-5-wind")
var card5humidity = $("#card-5-humidity")

// function for new search
// called by searchBtn.on("click", Search)
function Search() {
    
  // gets input for url for openweathermap api
    var city = cityName.val()

    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=e219d48ca531f5879866bfcf8c707612"

    // fetches api
    // runs DisplayCity, LocalStorage, and NewButton with name, lat, and lon parameters
    fetch(weatherUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            var lat = data.coord.lat
            var lon = data.coord.lon
            var name = data.name
    
            DisplayCity(name,lat,lon)
            LocalStorage(name,lat,lon)
            NewButton(name,lat,lon)
          });
        } else {
          alert("Not a valid City!")
          return
        }
      })     
}

// adds new search to local storage
function LocalStorage(name,lat,lon) {

    var Cities = JSON.parse(localStorage.getItem("Cities"));

    if (Cities === null) {
        Cities = []
    }

    // pushes new city to local storage 
    // icludes name, lat, and lon in push for later use
    Cities.push(name + "/" + lat + "/" + lon)

    localStorage.setItem("Cities", JSON.stringify(Cities))
}

// creates new button from new search
function NewButton(name,lat,lon) {

    var btn = document.createElement("button")

    btn.textContent = name
    btn.setAttribute("type", "button")
    btn.setAttribute("class", "btn-custom mb-2 btn btn-secondary btn-lg d-block")
    btn.setAttribute("lat", lat)
    btn.setAttribute("lon", lon)

    btnUl.append(btn)
}

// uses parameters passed to it to display weather information
function DisplayCity(name,lat,lon) {

    // creates url from lat and lon for api
    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat +"&lon="+ lon +"&units=imperial&exclude=minutely,hourly,alerts&appid=e219d48ca531f5879866bfcf8c707612"

    fetch(forecastUrl)
      .then(function (response) {

        if (response != 404) {
          return response.json();
        }
      })
      .then(function (data) {

        // gets unix time stamp from api and converts it using moment
        var dt = data.daily[0].dt
        var moment = window.moment(dt, "X").format("MM/DD/YYYY")
        
        // generates url for weather icon
        var icon = data.current.weather[0].icon
        var iconUrl = "http://openweathermap.org/img/wn/" + icon + ".png"
        mainIcon.setAttribute("src", iconUrl)

        // sets text for different areas using data from api
        selectedCity.text(name + " - "+ moment)
        temp.text("Temp: " + data.current.temp)
        wind.text("Wind: " + data.current.wind_speed + " MPH")
        humidity.text("Humidity: " + data.current.humidity + " %")
        UVP.text("UV Index: ")
        UV.text(data.current.uvi)

        // changes background color of UVI area based of number
        if (data.current.uvi <3) {
          UV.attr('style',  'background-color: green')
        } else if (data.current.uvi <6) {
          UV.attr('style',  'background-color: orange')
        } else if (data.current.uvi >6) {
          UV.attr('style',  'background-color: red')
        }

        Cards(data)
      });
}

// creates 5 day forecast cards and sets values
function Cards(data) {

  // gets time unix time stamps for 5 day forecast and converts them
  var moment1 = window.moment(data.daily[1].dt, "X").format("MM/DD/YYYY")
  var moment2 = window.moment(data.daily[2].dt, "X").format("MM/DD/YYYY")
  var moment3 = window.moment(data.daily[3].dt, "X").format("MM/DD/YYYY")
  var moment4 = window.moment(data.daily[4].dt, "X").format("MM/DD/YYYY")
  var moment5 = window.moment(data.daily[5].dt, "X").format("MM/DD/YYYY")

  // gets icon numbers
  var icon1 = data.daily[1].weather[0].icon
  var icon2 = data.daily[2].weather[0].icon
  var icon3 = data.daily[3].weather[0].icon
  var icon4 = data.daily[4].weather[0].icon
  var icon5 = data.daily[5].weather[0].icon

  // uses icon numbers to generate urls for weather icons
  var iconUrl1 = "http://openweathermap.org/img/wn/" + icon1 + ".png"
  var iconUrl2 = "http://openweathermap.org/img/wn/" + icon2 + ".png"
  var iconUrl3 = "http://openweathermap.org/img/wn/" + icon3 + ".png"
  var iconUrl4 = "http://openweathermap.org/img/wn/" + icon4 + ".png"
  var iconUrl5 = "http://openweathermap.org/img/wn/" + icon5 + ".png"

  // sets text to corresponding date
  card1date.text(moment1)
  card2date.text(moment2)
  card3date.text(moment3)
  card4date.text(moment4)
  card5date.text(moment5)

  // sets icons
  card1img.setAttribute("src", iconUrl1)
  card2img.setAttribute("src", iconUrl2)
  card3img.setAttribute("src", iconUrl3)
  card4img.setAttribute("src", iconUrl4)
  card5img.setAttribute("src", iconUrl5)

  // sets text for temps
  card1temp.text("Temp: " + data.daily[1].temp.day)
  card2temp.text("Temp: " + data.daily[2].temp.day)
  card3temp.text("Temp: " + data.daily[3].temp.day)
  card4temp.text("Temp: " + data.daily[4].temp.day)
  card5temp.text("Temp: " + data.daily[5].temp.day)

  // sets text for wind
  card1wind.text("Wind: " + data.daily[1].wind_speed + " MPH")
  card2wind.text("Wind: " + data.daily[2].wind_speed + " MPH")
  card3wind.text("Wind: " + data.daily[3].wind_speed + " MPH")
  card4wind.text("Wind: " + data.daily[4].wind_speed + " MPH")
  card5wind.text("Wind: " + data.daily[5].wind_speed + " MPH")

  // sets text for humidity
  card1humidity.text("Humidity: " + data.daily[1].humidity + " %")
  card2humidity.text("Humidity: " + data.daily[2].humidity + " %")
  card3humidity.text("Humidity: " + data.daily[3].humidity + " %")
  card4humidity.text("Humidity: " + data.daily[4].humidity + " %")
  card5humidity.text("Humidity: " + data.daily[5].humidity + " %")
}

// uses info stored in button to call DisplayCity()
// called by btnUl.on("click", ".btn", ExistingSearch)
function ExistingSearch(event) {
    
    var name = event.target.textContent
    var lat = event.target.getAttribute("lat")
    var lon = event.target.getAttribute("lon")

    DisplayCity(name,lat,lon)
}

// loads buttons saved in localstorage
function LoadButtons() {
    
    var Cities = JSON.parse(localStorage.getItem("Cities"))

    if (Cities != null) {

        for (let i of Cities) {

            // splits values saved in localstorage for use
            var split = i.split("/")

            var btn = document.createElement("button")

            // uses stored values to set attributes and generate buttons
            btn.textContent = split[0]
            btn.setAttribute("type", "button")
            btn.setAttribute("class", "btn-custom mb-2 btn btn-secondary btn-lg d-block")
            btn.setAttribute("lat", split[1])
            btn.setAttribute("lon", split[2])

            btnUl.append(btn)
        }
    }
}

btnUl.on("click", ".btn", ExistingSearch)
searchBtn.on("click", Search)
LoadButtons()