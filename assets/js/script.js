//create a function ready on load
$(document).ready(function() {
    //on search button click, run searchCity function
    $('#saveCity').on('click', function(event) {
        //pass event as parameter
        searchCity(event);
    });
});

var searchCity = function (event) {
    //prevent default action
    event.preventDefault();
    //create var to hold api URL
    var apiURl = "https://api.openweathermap.org/data/2.5/onecall?appid=2e20e33b3d5d1aa551ca0dfae625e5b0";

    //use fetch to grab requested data response
    fetch(apiURl).then(function(response) {
        //request successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log("hehe")
            });
        } else {
            alert('Please enter a valid city!')
        }
    });
};