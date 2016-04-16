var background = {
  "thunderstorm" : "http://farmersalmanac.com/wp-content/uploads/2015/06/Thunderstorm-5best.jpg",
  "drizzle" : "http://miriadna.com/desctopwalls/images/max/Rain-drops-on-the-branches.jpg",
  "rainy" : "http://tommycarwash.com/blog/wp-content/uploads/2015/08/rain.jpg",
  "snow" : "http://wonderopolis.org/wp-content/uploads//2015/02/97_1.jpg",
  "clear" : "http://i1155.photobucket.com/albums/p542/thirteenten/20150108_163855_zpswvc34uyw.jpg",
  "cloudy" : "http://hayatimagazine.com/wp-content/uploads/2015/04/tree-under-cloudy-sky-nature-hd-wallpaper-1920x1200-3821.jpg",
  "sunny" : "http://4.bp.blogspot.com/-0Syq7c-jrWs/UUH819_qfhI/AAAAAAAABzs/D1UIP_x1P2Q/s1600/sunny-day-wallpaper.jpg"
};

$(document).ready(function(){
  var loc = {};
  var units = "imperial";
  var weatherURL = "";
  var $body = $('body');
  var $thunderstorm = $('#thunder-storm');
  var $rainy = $('#rainy');
  var $flurries = $('#flurries');
  var $sunny = $('#sunny');
  var $cloudy = $('#cloudy');
  var $fahrenheit = $('#fahrenheit');
  var $celsius = $('#celsius');
  var $city = $('.city h4');
  var $temp = $('.temp-info');
  var $windSpeed = $('.wind-info');
  var getData = function(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        loc.lat = position.coords.latitude;
        loc.long = position.coords.longitude;
     
        weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" +  loc.lat + "&lon=" + loc.long + "&appid=ce84f4dedfe6ae8f59e0cbbfada3faf5&units=" + units;
      
        $.getJSON(weatherURL, function(json){
  
        var temp = Math.round(json.main.temp);
        var city = json.name;
        var condition = json.weather[0].main;
        var sunriseUTC = json.sys.sunrise;
        var sunsetUTC = json.sys.sunset;
        var updateUTC = json.dt;
        var windSpeed = Math.round(json.wind.speed);
        var convertTimeStamp = function(timestamp){
          var d = new Date(timestamp * 1000),
              hh = d.getHours(),
              h = hh,
              min = ('0' + d.getMinutes()).slice(-2),
              ampm = 'AM',
              time;
          
          if (hh > 12){
            h = hh - 12;
            ampm = 'PM';
          } else if (hh === 12){
            h = 12;
            ampm = 'PM';
          } else if (hh === 0){
            h = 12;
          }
          
          time = h + ":" + min + " " + ampm;
          
          return time;
        };
        
        var sunrise = convertTimeStamp(sunriseUTC);
        var sunset = convertTimeStamp(sunsetUTC);
        var update = convertTimeStamp(updateUTC);
        
        $('.left-bottom-left').append("<h3>" + sunrise + "</h3>");
        $('.left-bottom-right').append("<h3>" + sunset + "</h3>");
        $('.left-bottom-bottom').append("<h6>Last update: " + update + "</h6>");
        
        var windDirection = function(){
          var windDeg = json.wind.deg;
          $('.wind-direction span').css({
            "transform" : "rotate(" + windDeg + "deg)",
            "-webkit-transform" : "rotate(" + windDeg + "deg)"
                                        });
          
          if (windDeg > 348.75 || windDeg <= 11.25){
            return "N";
          } else if (windDeg > 11.25 && windDeg <= 33.75){
            return "NNE";
          } else if (windDeg > 33.75 && windDeg <= 56.25){
            return "NE";
          } else if (windDeg > 56.25 && windDeg <= 78.75){
            return "ENE";
          } else if (windDeg > 78.75 && windDeg <= 101.25){
            return "E";
          } else if (windDeg > 101.25 && windDeg <= 123.75){
            return "ESE";
          } else if (windDeg > 123.75 && windDeg <= 146.25){
            return "SE";
          } else if (windDeg > 146.25 && windDeg <= 168.75){
            return "SSE";
          } else if (windDeg > 168.75 && windDeg <= 191.25){
            return "S";
          } else if (windDeg > 191.25 && windDeg <= 213.75){
            return "SSW";
          } else if (windDeg > 213.75 && windDeg <= 236.25){
            return "SW";
          } else if (windDeg > 236.25 && windDeg <= 258.75){
            return "WSW";
          } else if (windDeg > 258.75 && windDeg <= 281.25){
            return "W";
          } else if (windDeg > 281.25 && windDeg <= 303.75){
            return "WNW";
          } else if (windDeg > 303.75 && windDeg <= 326.25){
            return "NW";
          } else if (windDeg > 326.25 && windDeg <= 348.75){
            return "NNW";
          }
        };
        
        $city.html(city); // City
        $temp.append("<h3>" + temp + "&#176;</h3>"); // Tempurature
        $('.condition').append("<h4>" + condition + "</h4>"); // Current weather condition
        $windSpeed.append("<h3>" + windSpeed + "<b>MPH</b></h3>"); // Wind speed
        $('.wind-direction').append("<h3>" + windDirection() + "</h3>") // Wind direction
        
        var displayIcon = function(icon){
          icon.css('display', 'inline-block');
        };
        
        var displayBackground = function(weather){
          var backgroundImage = background[weather];
          
          $body.css({"background": "url(" + backgroundImage + ") center center no-repeat", "background-size" : "cover"})
        };
        
        var $id = json.weather[0].id;
        
        if($id >= 200 && $id <= 299){
          displayIcon($thunderstorm);
          displayBackground("thunderstorm");
        } else if ($id >= 500 && $id <= 599){  
          displayIcon($rainy);
          displayBackground("rainy");
        } else if ($id >= 600 && $id <= 699){
          displayIcon($flurries);
          displayBackground("flurries");
        } else if ($id == 800){
          displayIcon($sunny);
          displayBackground("sunny");
        } else if ($id >=801 && $id <= 899){
          displayIcon($cloudy);
          displayBackground("cloudy");
        }
        
        });
      }); // END getCurrentPosition
    }; // END geolocation if statement
  }; // END getData
  
  getData();
  
  var getNewData = function(speedUnits){
    var $tempInfo = $('.temp h3');
    var $windSpeedInfo = $('.wind-speed h3');
    
    $tempInfo.html("");
    $windSpeedInfo.html("");
    weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" +  loc.lat + "&lon=" + loc.long + "&appid=ce84f4dedfe6ae8f59e0cbbfada3faf5&units=" + units;
    
    $.getJSON(weatherURL, function(newJson){
      var newTemp = Math.round(newJson.main.temp);
      var newWindSpeed = Math.round(newJson.wind.speed);
      $tempInfo.html(newTemp + "&#176;");
      $windSpeedInfo.html(newWindSpeed + "<b>"+ speedUnits + "</b>");
    })
  }; // END getNewData
  
  var operateSwitch = function(){
    var selection = function(selected, unselected){
      selected.removeClass("unselected")
              .addClass("selected");
      unselected.removeClass("selected")
              .addClass("unselected");
    };
          
    if ($fahrenheit.hasClass("selected")){
      selection($celsius, $fahrenheit);
      units = "metric";
      getNewData("M/S");
    } else if ($celsius.hasClass("selected")){
      selection($fahrenheit, $celsius);
      units = "imperial";
      getNewData("MPH");
    }
  }; // END operateSwitch
  
  $('.switch').click(function(){
    operateSwitch();
  }) // END .switch click
}); // END document.ready