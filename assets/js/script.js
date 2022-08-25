var cityName = $("#city-input").val();

//function to fetch uvi data.
var displayCurrentWeather = function (location) {
    var { lat } = location;
    var { lon } = location;
    var apiUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=b0d53b2eea04b97d7d6b6fb4067a4387`
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
        });
      } else {
        alert('Error: Weather Not Found');
      }
    })
    .catch(function(error) {
      alert("Unable to display weather");
    });

};

//function to get weather data by city name 
function getGeo(cityName)
{
    var apiGeo = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b0d53b2eea04b97d7d6b6fb4067a4387`
    console.log(apiGeo);
    fetch(apiGeo).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
              displayCurrentWeather(data.coord)  
              console.log(data.coord.lat);
            });
          } else {
            alert('Error: Weather Not Found');
          }
        //displayCurrentWeather(geo_data[0]);
       
        
        
    })
}

//function to get 5 day forecast data
function getForecast (){
   var apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=b0d53b2eea04b97d7d6b6fb4067a4387`
   fetch(apiForecast).then(function(response){
     if (response.ok) {
        response.json().then(function(data) {
          displayCurrentWeather(data.coord.lat);
        });
     } else {
        alert('Error: Weather Not Found');
     }
   })
}

//run functions when search button is clicked. 
$("#city-search").on("click", function(){
    var cityName = $("#city-input").val();
    console.log(cityName);
    getGeo(cityName);
    // getForecast (cityName);
})