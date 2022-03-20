//create vars to hold apiKey, search city btn, and input field
var apiKey = "3143d8257b41b59979eb92c68e459d58";
var searchButton = document.querySelector(".saveBtn");
var cityInput = document.querySelector("#city");
var searchCounter = 0;

var getForecast = function (cityName) {
    //create var to hold cityName val
    //var cityName = $("#city").val();
    //create var to hold apiURL
    var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" +cityName+
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
                createForecast(data.daily);
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
    $("#tempCity").text(data.temp + '\xB0' + 'F');
    $("#windCity").text(data.wind_speed + ' MPH');
    $("#humidityCity").text(data.humidity + '%' );
    $("#uvIndexCity").text(data.uvi);

    //create if else statement to change color of text based on uv index
    if (data.uvi <= 2) {
        $("#uvIndexCity").addClass('fav');
    } else if (data.uvi >= 3 || data.uvi <= 5) {
        $("#uvIndexCity").addClass('mod');
    } else if (data.uvi >= 6 || data.uvi <= 7) {
        $("#uvIndexCity").addClass('high');
    } else if (data.uvi >= 8 || data.uvi <= 10) {
        $("#uvIndexCity").addClass('vhigh');
    } else if (data.uvi >= 11) {
        $("#uvIndexCity").addClass('extreme');
    }
};

var createForecast = function (data) {
    console.log(data);
    //create vars to hold moment
    var date1 = moment(data[1].dt*1000).format('MMM DD');
    var date2 = moment(data[2].dt*1000).format('MMM DD');
    var date3 = moment(data[3].dt*1000).format('MMM DD');
    var date4 = moment(data[4].dt*1000).format('MMM DD');
    var date5 = moment(data[5].dt*1000).format('MMM DD');
    //create date from vars
    $("#date1").text(date1);
    $("#date2").text(date2);
    $("#date3").text(date3);
    $("#date4").text(date4);
    $("#date5").text(date5);
    //create temp from array
    $("#temp1").text(data[1].temp.day + '\xB0' + ' F');
    $("#temp2").text(data[2].temp.day + '\xB0' + ' F');
    $("#temp3").text(data[3].temp.day + '\xB0' + ' F');
    $("#temp4").text(data[4].temp.day + '\xB0' + ' F');
    $("#temp5").text(data[5].temp.day + '\xB0' + ' F');
    //create wind from array
    $("#wind1").text(data[1].wind_speed + ' MPH');
    $("#wind2").text(data[2].wind_speed + ' MPH');
    $("#wind3").text(data[3].wind_speed + ' MPH');
    $("#wind4").text(data[4].wind_speed + ' MPH');
    $("#wind5").text(data[5].wind_speed + ' MPH');
    //create humidity from array
    $("#hum1").text(data[1].humidity + ' %');
    $("#hum2").text(data[2].humidity + ' %');
    $("#hum3").text(data[3].humidity + ' %');
    $("#hum4").text(data[4].humidity + ' %');
    $("#hum5").text(data[5].humidity + ' %');
};

//create function that calls getForecast function
var searchCity = function () {
    //create var to hold cityName
    var cityName = $("#city").val();
    //call getForecast to get lat/lon
    getForecast(cityName);
    //call save searches function
    saveSearches();
};

var saveSearches = function () {
    var cityName = $("#city").val();
    var searchHistoryEl = document.createElement("button");
    searchHistoryEl.classList = "btn text-center historyBtn";
    searchHistoryEl.setAttribute('data-id', searchCounter);
    searchHistoryEl.textContent = $("#city").val().trim();
    //append to empty div
    $("#searchHistory").append(searchHistoryEl);
    searchCounter++;
    //use localstorage to save search history
    localStorage.setItem(searchCounter, cityName);
};


//create event listener for search button to run searchCity function
$(".saveBtn").on('click', searchCity);
