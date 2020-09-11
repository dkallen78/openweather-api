let cityID = "3526501"
let apiKey = "9a5d233125e5fb51927ccee602c54cb4"
fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${apiKey}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
    weatherData = myJson;
    display(weatherData);
  });

function makeCompass(deg) {
  //------------------------------------------------------//
  //Draws the final bits of the compass and points the    //
  //  hand in the right direction                         //
  //integer-> deg: direction the wind is blowing          //
  //------------------------------------------------------//

  function makeSVG(type) {
    //----------------------------------------------------//
    //Makes an SVG element                                //
    //string-> type: type of SVG element to be created    //
    //----------------------------------------------------//

    let svg = document.createElementNS("http://www.w3.org/2000/svg", type);
    if (arguments.length > 1) {svg.id = arguments[1]};
    return svg;
  }

  function makeLines(parent, number) {
    //----------------------------------------------------//
    //Makes the ellipses that point to the hours          //
    //element-> parent: the <svg> element into which      //
    //  the ellipses will be inserted                     //
    //integer-> number: the number of ellipses to make    //
    //----------------------------------------------------//

    let angle = 0;
    let change = 360 / number;

    for (let i = 0; i < number; i++) {
      let line = makeSVG("line");
      line.setAttribute("x1", "50");
      line.setAttribute("y1", "20");
      line.setAttribute("x2", "50");
      line.setAttribute("y2", "5");
      line.classList.add("line");
      line.style.transform = "rotate(" + angle + "deg)";
      parent.appendChild(line);

      angle += change;
    }
  }

  function makeHand(parent, id) {
    //----------------------------------------------------//
    //Makes the hands of the clock                        //
    //element-> parent: the <svg> element into which      //
    //  the hand will be inserted                         //
    //string-> id: the id of the hand                     //
    //----------------------------------------------------//

    let hand = makeSVG("rect", id);
    hand.classList.add("hands");
    parent.appendChild(hand);

    return hand;
  }

  let compass = document.getElementById("compass");

  let svg = document.getElementById("svgCompass");

  makeLines(svg, 8);

  let hand = makeHand(svg, "direction");
  hand.style.transform = "rotateZ(" + (deg + 180) + "deg)";
}

function display(weatherData) {
  //------------------------------------------------------//
  //Displays the weather information                      //
  //JSON-> weatherData: weather information               //
  //------------------------------------------------------//

  let weatherDiv = document.getElementById("weatherDiv");
  weatherDiv.style.filter = "opacity(1)";

  let cityDiv = document.getElementById("cityDiv");
  let city = weatherData.name;
  cityDiv.innerHTML = city;

  let tempSpan = document.getElementById("tempSpan");
  let temp = (weatherData.main.temp - 273.15).toFixed(2);
  tempSpan.innerHTML = temp + "°C";

  let weatherIcon = document.getElementById("weatherIcon");
  let icon = weatherData.weather[0].icon;
  weatherIcon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

  let weatherDescription = document.getElementById("weatherDescription");
  weatherDesc = weatherData.weather[0].description;
  weatherDescription.innerHTML = weatherDesc;

  let humiditySpan = document.getElementById("humiditySpan");
  let humidity = weatherData.main.humidity;
  humiditySpan.innerHTML = humidity + "%";

  makeCompass(weatherData.wind.deg);

  let windDiv = document.getElementById("windDiv");
  let windSpeed = weatherData.wind.speed;
  windDiv.innerHTML = windSpeed + " m/s";

  let timeDiv = document.getElementById("timeDiv");
  let now = new Date();
  let hour = now.getHours().toString().padStart(2, "0");
  let minute = now.getMinutes().toString().padStart(2, "0");
  timeDiv.innerHTML = `${now.toDateString()} ${hour}:${minute}`;

  if ((now.getTime() / 1000) > weatherData.sys.sunset || (now.getTime() / 1000) < weatherData.sys.sunrise) {
    console.log(`now: ${now.getTime()}`);
    console.log(`sunset: ${weatherData.sys.sunset}`);
    console.log(`sunrise: ${weatherData.sys.sunrise}`);
    document.body.style.backgroundImage = "radial-gradient(circle at 10% 10%, white 5%, gray, black 15%)";
  }
}




  //.wind.deg
  //.wind.speed
  //.main.humidity
  //.weather[0].icon 50n
  /*function display() {
    let weatherDiv = document.getElementById("weatherDiv");
    weatherDiv.style.filter = "opacity(1)";

    let cityDiv = document.getElementById("cityDiv");
    let city = "Jilotepec de Molina Enríquez";
    cityDiv.innerHTML = city;

    let tempSpan = document.getElementById("tempSpan");
    let temp = 15;
    tempSpan.innerHTML = temp + "°C";

    let weatherIcon = document.getElementById("weatherIcon");
    let icon = "50n";
    weatherIcon.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

    let weatherDescription = document.getElementById("weatherDescription");
    weatherDesc = "Mist";
    weatherDescription.innerHTML = weatherDesc;

    let humiditySpan = document.getElementById("humiditySpan");
    humidity = 90;
    humiditySpan.innerHTML = humidity + "%";
    makeCompass(90);
    let windDiv = document.getElementById("windDiv");
    windDiv.innerHTML = 1.3 + " m/s";
  }*/
