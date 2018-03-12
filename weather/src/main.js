console.log('main.js is connected!');

let url = new URL(window.location);

let params = new URLSearchParams(url.search.slice(1));

let locationCode;
let userUnitPref;

let locationInputField = document.querySelector('.location-input')
let locationSubmitButton = document.querySelector('.location-submit')

let header = document.querySelector("header");
let sticky = header.offsetTop;

// thanks w3schools
let addUrlParams = (name, value) => {
  params.set(name, value);
  window.history.replaceState({}, '', `${location.pathname}?${params}`);
}

let checkUrlParams = () => {
  let locationInUrl = params.get('location')
  // add check for unit preference
  if (locationInUrl) {
    getLatLonThenForecast(locationInUrl)
    locationInputField.placeholder = locationInUrl
  } else {
    console.log('no params!')
    document.querySelector('.current-conditions').textContent = "Enter your location above, and I'll show you some weather data!"
  }
}

let stickyHeader = () => {
  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

let get = (url) => {
  return fetch(url).then(response => response.json());
};

let submitButtonListener = () => {
  locationSubmitButton.addEventListener('click', evt => {
    evt.preventDefault()
      locationCode = locationInputField.value
      addUrlParams('location',locationInputField.value)
      getLatLonThenForecast(locationInputField.value)
  })
}

// let setUserUnitPreference = () => {
// // metric, imperial
// userUnitPref = params.get('unit')
// }

// THIS WHOLE FUNCTION IS SO SMELLY
let makeGeolocationButton = () => {
  if ("geolocation" in navigator) {
    let findMeButton = document.createElement('input')
    findMeButton.type = "button"
    findMeButton.value = "Find Me!"
    findMeButton.classList.add('location-submit')
    document.querySelector('form').appendChild(findMeButton)
    findMeButton.addEventListener('click', function () {
      locationInputField.placeholder = '';
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude)
        getWeatherInfo(position.coords.latitude, position.coords.longitude)
        getForecast(position.coords.latitude, position.coords.longitude)
        let geocodeData = get (`https://maps.googleapis.com/maps/api/geocode/json?address=${position.coords.latitude}+${position.coords.longitude}&key=AIzaSyDoN7vKc3SI5bmLX4HPA0KtjaA4D1HhJ3k`)
          .then(response => {
            addUrlParams('location',response.results[5].formatted_address)
            locationInputField.placeholder = response.results[5].formatted_address })
    })})
  } else {
    console.log("no geolocate")
  }
}

let getLatLonThenForecast = (input) => {
  console.log(input)
  let geocodeData = get (`https://maps.googleapis.com/maps/api/geocode/json?address=${input}&key=AIzaSyDoN7vKc3SI5bmLX4HPA0KtjaA4D1HhJ3k`)
  .then(response => {
    let lat = response.results[0].geometry.location.lat;
    let lng = response.results[0].geometry.location.lng;
    // console.log('google',lat,lng)
    getWeatherInfo(lat, lng)
    getForecast(lat, lng)
    console.log(response)
    addUrlParams('location',response.results[0].formatted_address)
    locationInputField.value = response.results[0].formatted_address
  })
}

let getWeatherInfo = (lat, lng) => {
  let weatherData = get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=imperial&appid=cd482b74889dab43efe2bedfc9f9e7bd`)
    .then(response => {
      console.log(response)
      return response
      })

  let currentConditionsContainer = document.querySelector('section.current-conditions')
  currentConditionsContainer.innerHTML = '';

  weatherData.then(res => {

    let infoLeftContainer = document.createElement('article')
    infoLeftContainer.classList.add('current-left')
    currentConditionsContainer.appendChild(infoLeftContainer)

    let infoRightContainer = document.createElement('article')
    infoRightContainer.classList.add('current-right')
    currentConditionsContainer.appendChild(infoRightContainer)

    let locationName = document.createElement('h1');
    locationName.textContent = `${res.name}`;
    infoLeftContainer.appendChild(locationName);

    // thanks to "basarat" for this one
    // https://gist.github.com/basarat/4670200
    let getCardinal = (angle) => {
      let directions = 8;

      let degree = 360 / directions;
      angle = angle + degree/2;

      if (angle >= 0 * degree && angle < 1 * degree)
          return "N";
      if (angle >= 1 * degree && angle < 2 * degree)
          return "NE";
      if (angle >= 2 * degree && angle < 3 * degree)
          return "E";
      if (angle >= 3 * degree && angle < 4 * degree)
          return "SE";
      if (angle >= 4 * degree && angle < 5 * degree)
          return "S";
      if (angle >= 5 * degree && angle < 6 * degree)
          return "SW";
      if (angle >= 6 * degree && angle < 7 * degree)
          return "W";
      if (angle >= 7 * degree && angle < 8 * degree)
          return "NW";
      //Should never happen:
      return "N";
    }

    let windSpeed = document.createElement('h2');
    windSpeed.textContent = `Wind: ${res.wind.speed} mph ${getCardinal(res.wind.deg)}`;
    infoLeftContainer.appendChild(windSpeed);

    let humidity = document.createElement('h2');
    humidity.textContent = `Humidity: ${res.main.humidity}%`;
    infoLeftContainer.appendChild(humidity);

    let sunriseSunset = () => {
      // thanks stackoverflow
      // https://stackoverflow.com/a/847196/9355291
      let sunriseDate = new Date(res.sys.sunrise*1000);
      let sunriseHours = sunriseDate.getHours();
      let sunriseMinutes = "0" + sunriseDate.getMinutes();
      let sunriseTime = sunriseHours + ':' + sunriseMinutes.substr(-2);

      let sunsetDate = new Date(res.sys.sunset*1000);
      let sunsetHours = sunsetDate.getHours();
      let sunsetMinutes = "0" + sunsetDate.getMinutes();
      let sunsetTime = sunsetHours + ':' + sunsetMinutes.substr(-2);

      let sunTimes = document.createElement('h2')
      sunTimes.innerHTML = `Sunrise: ${sunriseTime}<br> Sunset: ${sunsetTime}`
      infoLeftContainer.appendChild(sunTimes)
    }

    sunriseSunset()

    let tempValue = document.createElement('h1');
    tempValue.innerHTML = `It's ${Math.round(res.main.temp)}&deg;<br>with ${res.weather[0].description}`;
    infoRightContainer.appendChild(tempValue);

    let currentIcon = document.createElement('img');
    currentIcon.type = 'image/svg+xml';
    currentIcon.src = `./img/animated/${res.weather[0].icon}.svg`
    infoRightContainer.appendChild(currentIcon)

    let highToday = document.createElement('span');
    highToday.innerHTML = `&uarr; ${Math.round(res.main.temp_max)}&deg;`;
    infoRightContainer.appendChild(highToday);

    let lowToday = document.createElement('span');
    lowToday.innerHTML = `&darr; ${Math.round(res.main.temp_min)}&deg;`;
    infoRightContainer.appendChild(lowToday);

    })
 }

let getForecast = (lat, lng) => {
  let forecastData = get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=imperial&appid=cd482b74889dab43efe2bedfc9f9e7bd`)
    .then(response => {
      // console.log(response)
      return response})

  forecastData.then(res => {

    let firstDate = 0;
    let currentRow = 0;
    let forecastSection = document.querySelector('section.next-hours')
    forecastSection.innerHTML = '';

    for (let i = 0; i < res.list.length; i++){

      let time = res.list[i].dt_txt
      let date;
      let thisDate = res.list[i].dt_txt.substring(8,10)

      let rowBuilder = () => {
        let newForecastRow = document.createElement('article')
        newForecastRow.classList.add(`forecast-row-${currentRow}`,`forecast-row`)
        date = new Date(res.list[i].dt_txt.substring(0,10))
        // the documentation says that Sunday should = 0 and Monday = 1, but it's not...
        let days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        let dateRowHeader = document.createElement('h4')
        let newDayDiv = document.createElement('div')
        dateRowHeader.textContent = days[date.getDay()]

        forecastSection.appendChild(newDayDiv)
        newDayDiv.appendChild(dateRowHeader)
        newDayDiv.appendChild(newForecastRow)
      }

      let fillForecastRows = () => {

        let forecastRow = document.querySelector(`.forecast-row-${currentRow}`)

        // let dateElement = document.createElement('date')
        // dateElement.textContent = `${time.substring(5,10)}`
        // forecastRow.appendChild(dateElement);

        let timeElement = document.createElement('time')
        timeElement.textContent = `${time.substring(11,16)}`
        forecastRow.appendChild(timeElement);

        let condition = document.createElement('condition')
        condition.textContent = res.list[i].weather[0].main
        forecastRow.appendChild(condition)

        let conditionIcon = document.createElement('img');
        // conditionIcon.type = 'image/svg+xml';
        conditionIcon.src = `./img/static/${res.list[i].weather[0].icon}.svg`
        forecastRow.appendChild(conditionIcon)

        let temp = document.createElement('temp')
        temp.innerHTML = `${Math.round(res.list[i].main.temp)}&deg;`
        forecastRow.appendChild(temp)
      }

      if (firstDate != thisDate) {
        currentRow++
        // console.log('if',firstDate,' ',thisDate)
        rowBuilder()
        fillForecastRows()
        firstDate = thisDate
      } else {
        // console.log('else',firstDate,' ',thisDate)
        fillForecastRows()
        firstDate = thisDate
      }
// end of for loop
    }
  })
}

let init = () => {
  checkUrlParams()
  submitButtonListener()
  makeGeolocationButton()
}

window.onscroll = () => {stickyHeader()};
init()
