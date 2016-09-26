$(document).ready(function() {

	// get local zip code from ip address
	$.ajax({
    url: "http://ipinfo.io/json",
    success: function(res, txt, xhr) {
      console.log(res);
      $("#city").html(res.city);
      $("#country").html(res.country);
			document.getElementById("chooseZip").placeholder = res.postal;

			function getWeather(zip) {
				var apiLink = "";
				if( $("#chooseZip").val() !== "") {
					apiLink = "http://api.openweathermap.org/data/2.5/weather?zip=" + $("#chooseZip").val() + ",US&APPID=aebb13fe929de5b1d6b3355ef5dc181c";
				}
				else {
					apiLink = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",US&APPID=aebb13fe929de5b1d6b3355ef5dc181c";
				}

				$.ajax({
	        url: apiLink,
	        success: function(res2, txt2, xhr2) {
	          console.log(res2);
						$("#city").html(res2.name);
	          $("#temp").html( (res2.main.temp * (9/5) - 459.67).toFixed(0) + " &deg;F");
						$("#weather").html(res2.weather[0].main);
	          $("#humidity").html(res2.main.humidity + "%");

						function getTime(timestamp) {
							var date = new Date(timestamp*1000);
							// Hours part from the timestamp
							var hours = date.getHours();
							if(hours > 12) hours -= 12;
							// Minutes part from the timestamp
							var minutes = "0" + date.getMinutes();
							// Will display time in 10:30:23 format
							var formattedTime = hours + ':' + minutes.substr(-2);

							return formattedTime;
						}

	          $("#sunrise").html( getTime(res2.sys.sunrise) + " AM");
	          $("#sunset").html( getTime(res2.sys.sunset) + " PM");
	        }
	      });
			}

			getWeather(res.postal);

			$("#chooseZip").change(function() {
				$(".main-container").fadeOut(function() {
					getWeather( $("#chooseZip").val() );
					$(".main-container").fadeIn();
				});

			});


    }
  });

});
