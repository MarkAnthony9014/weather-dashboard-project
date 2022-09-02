var cityName = $("#city-input").val();


//function to fetch uvi data.
var displayUVI = function (location) {
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
        
        $("#UVIndex").append("" + data.value);
        
        if (data.value >= 3){
        $("#UVIndex").addClass("UVIndex , btn-success");};

        if (data.value >= 7) {
        $("#UVIndex").addClass("UVIndex , btn-warning");
        };

        if (data.value >= 8){
        $("#UVIndex").addClass("UVIndex , btn-danger");
        };

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
function getCurrentWeather(cityName)
{
    var apiGeo = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9cdc1547699df7c82c0edd4bcb758d7d`
    console.log(apiGeo);
    fetch(apiGeo).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
              displayUVI(data.coord)  
              console.log(data);
              var UVI = data.value;
              var date = new Date(data.dt * 1000);
              $("#cityH2").append(cityName, ` (${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`);
              $("#currentTemp").append("" + data.main.temp);
              $("#currentWind").append("" + data.wind.speed + " mph");
              $("#currentHumidity").append("" + data.main.humidity);
            

            });
          } else {
            alert('Error: Weather Not Found');
          }
        //displayCurrentWeather(geo_data[0]);
       
        
        
    })
}

//function to get 5 day forecast data
function getForecast (){
   var apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&limit=5&appid=b0d53b2eea04b97d7d6b6fb4067a4387`
   fetch(apiForecast).then(function(response){
     if (response.ok) {
        response.json().then(function(data) {
          console.log(data);
          displayUVI(data.coord.lat);

        });
     } else {
        alert('Error: Weather Not Found');
     }
   })
}



//run functions when search button is clicked. 
$("#city-search").on("click", function(){
    var cityName = $("#city-input").val();
    localStorage.setItem("lastCity", cityName);
    console.log(cityName);
    getCurrentWeather(cityName);
    $("#city-input").val("");
    getForecast (cityName);
})
