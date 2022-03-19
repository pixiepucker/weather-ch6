//create vars to hold apiKey, search city btn, and input field
var apiKey = "3143d8257b41b59979eb92c68e459d58";
var searchButton = document.querySelector(".saveBtn");
var cityInput = document.querySelector("#city");

var getForecast = function () {
    var cityName = $("#city").val();
    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" +cityName+
    "&appid=" +apiKey;

    //use fetch to grab json data from apiURL and return it in function(response)
    fetch(apiURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data);
            });
        } else {
            alert("Please enter a valid city!");
        }
    })
    .catch(function(error) {
        alert("Unable to connect to Open Weather API!")
    });
};

var displayWeather = function (data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    var apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat+
    "&lon=" +lon+ "&exclude=hourly,daily&appid=" + apiKey;

    fetch(apiURL);
};

//create function that calls getForecast function
var searchCity = function () {
    getForecast(cityName);

    var cityName = $("#city").val();
    console.log(cityName);
};

//create event listener for search button to run searchCity function
$(".saveBtn").on('click', searchCity);