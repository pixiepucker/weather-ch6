//create vars to hold apiKey, search city btn, and input field
var apiKey = "3143d8257b41b59979eb92c68e459d58";
var searchButton = document.querySelector(".saveBtn");
var cityInput = document.querySelector("#city");
var searchCounter = 0;

var getForecast = function (cityName) {
    //create var to hold cityName val
    //var cityName = $("#city").val();
    //create var to hold apiURL
    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" +cityName+
    "&appid=" +apiKey;

    //use fetch to grab json data from apiURL and return it in function(response)
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                //if response is good, pass data to displayWeather
                displayWeather(data);
            });
        } else {
            //if not please alert user
            alert("Please enter a valid city!");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather API!");
    });
};

var displayWeather = function (data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+
    "&lon=" +lon+ "&exclude=hourly&units=imperial&appid=" + apiKey;

    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                createDisplay(data.current);
            });
        } else {
            alert("Error: Please enter a valid city!");
        }
    })
    .catch(function(error) {
        alert("Unable to connect, please try again later!");
    });
};

var createDisplay = function(data) {
    console.log(data);
    $("#tempCity").text(data.temp + '\xB0' + 'F');
    $("#windCity").text(data.wind_speed + ' MPH');
    $("#humidityCity").text(data.humidity + '%' );
    $("#uvIndexCity").text(data.uvi);
};

//create function that calls getForecast function
var searchCity = function () {
    //create var to hold cityName
    var cityName = $("#city").val();
    //call getForecast to get lat/lon
    getForecast(cityName);
    //use localstorage to save search history
    localStorage.setItem("city", cityName);
};

var saveSearches = function () {
    var searchHistoryEl = document.createElement("button");
    searchHistoryEl.classList = "btn";
    searchHistoryEl.setAttribute('data-id', searchCounter);
    searchHistoryEl.textContent = cityInput;

    //use localstorage to save search history
    localStorage.setItem("city", cityName);
};

//create event listener for search button to run searchCity function
$(".saveBtn").on('click', searchCity);

//function (current);