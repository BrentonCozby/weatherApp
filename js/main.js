$(document).ready(function() {

    $(".main-container").fadeIn(1200);

    // get local zip code from ip address
    $.ajax({
        url: "http://ipinfo.io/json",
        success: function(res, txt, xhr) {
            console.log(res);
            $("#city").html(res.city);
            document.getElementById("chooseZip").placeholder = res.postal;

            function getWeather(zip) {
                var apiLink = "";
                if ($("#chooseZip").val() !== "") {
                    apiLink = "http://api.openweathermap.org/data/2.5/weather?zip=" + $("#chooseZip").val() + ",US&APPID=aebb13fe929de5b1d6b3355ef5dc181c";
                } else {
                    apiLink = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",US&APPID=aebb13fe929de5b1d6b3355ef5dc181c";
                }

                $.ajax({
                    url: apiLink,
                    success: function(res2, txt2, xhr2) {
                        console.log(res2);
                        $("#city").html(res2.name + ",&nbsp;");
                        $("#country").html(res2.sys.country)
                        $("#temp").html((res2.main.temp * (9 / 5) - 459.67).toFixed(0));
						$("#temp-change").html("°F");
						$("#temp-change").unbind().on("click", function() {
							console.log($("#temp-change").html());
							if($("#temp-change").html() == "°F") {
								$("#temp").html((res2.main.temp - 273.15).toFixed(0))
								$("#temp-change").html("°C");
							}
							else {
								$("#temp").html((res2.main.temp * (9 / 5) - 459.67).toFixed(0))
								$("#temp-change").html("°F");
							}

						})
                        $("#weather").html(res2.weather[0].description);
						if(res2.weather[0].id < 300) {
							$(".data img").attr("src", "http://i.imgur.com/G5dIJDd.png");
						} else if(res2.weather[0].id < 600) {
							$(".data img").attr("src", "http://i.imgur.com/V8jVgVf.png");
						} else if(res2.weather[0].id < 700) {
							$(".data img").attr("src", "http://i.imgur.com/bl5B3Sg.png");
						} else if(res2.weather[0].id === 800) {
							$(".data img").attr("src", "http://i.imgur.com/u3SmnRQ.png");
						} else if(res2.weather[0].id === 801) {
							$(".data img").attr("src", "http://i.imgur.com/Q7kUCgj.png");
						} else if(res2.weather[0].id < 900) {
							$(".data img").attr("src", "http://i.imgur.com/SxaehkV.png");
						}
                        $("#humidity").html(res2.main.humidity + "%");

                        function getTime(timestamp) {
                            var date = new Date(timestamp * 1000);
                            // Hours part from the timestamp
                            var hours = date.getHours();
                            if (hours > 12) hours -= 12;
                            // Minutes part from the timestamp
                            var minutes = "0" + date.getMinutes();
                            // Will display time in 10:30:23 format
                            var formattedTime = hours + ':' + minutes.substr(-2);

                            return formattedTime;
                        }

                        $("#sunrise").html(getTime(res2.sys.sunrise) + " AM");
                        $("#sunset").html(getTime(res2.sys.sunset) + " PM");

                        $(".main-container").fadeIn('fast');
                        $("#chooseZip").focus().select();
                    }
                });
            }

            getWeather(res.postal);

            $("#chooseZip").change(function() {
                $(".main-container").fadeOut('fast', function() {
                    getWeather($("#chooseZip").val());
                });

            });


        }
    });

});
