//create a function ready on load
$(document).ready(function() {
    //on search button click, run searchCity function
    $('#saveCity').on('click', function(event) {
        //create var that holds value from input
        var cityInput = $("#city").val();
        var citySearchBtn = $("#citySearch").text();
        //set items to lS to be accessed later and displayed
        localStorage.setItem(cityInput, JSON.stringify(citySearchBtn));

        //pass event as parameter
        searchCity(event);
    });
});

var searchCity = function (event) {
    //prevent default action
    event.preventDefault();
    //create var to hold api URL
    var apiURl = "https://api.openweathermap.org/data/2.5/onecall?q=${input}&appid=3143d8257b41b59979eb92c68e459d58";

    //use fetch to grab requested data response
    fetch(apiURl).then(function(response) {
        //request successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log("hehe")
            });
        } else {
            //alert user they need to enter valid city
            alert('Please enter a valid city!')
        }
        
        return data;
    });

};