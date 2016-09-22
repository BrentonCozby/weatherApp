$(document).ready(function() {

	$.ajax({
    url: "http://ipinfo.io/json",
    success: function(res, txt, xhr) {
      console.log(res);
      $("#city").html(res.city);
      $("#country").html(res.country);

      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?zip=" + res.city + ",&APPID=aebb13fe929de5b1d6b3355ef5dc181c",
        success: function(res2, txt2, xhr2) {
          console.log(res2);
          $("#temp").html( (res2.main.temp * (9/5) - 459.67).toFixed(0) + " &deg;F");
          $("#humidity").html(res2.main.humidity + "%");
          $("#sunrise").html(Date(res2.sys.sunrise));
          $("#sunset").html(Date(res2.sys.sunset));
        }
      });
    }
  });



});
