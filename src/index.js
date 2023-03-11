let axiosUrl = 'https://jsonplaceholder.typicode.com/comments/'
let apiKey = 'dff5c692192605ee5ed7f95b423ae857'
let apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?q=chicago&units=imperial&appid=dff5c692192605ee5ed7f95b423ae857'
let iconUrl = 'https://openweathermap.org/img/wn/10d@2x.png'

//update weather temperature
function displayTemperature(response) {
  let tempElement = Math.round(response.data.main.temp)
  let currentTemp = document.querySelector('#current-temp')
  currentTemp.innerHTML = `${tempElement}°`

  fahrenheitTemperature = response.data.main.temp
}

axios.get(apiUrl).then(displayTemperature)

//switch Farheneit and Celsius
function displayFTemperature(event) {
  event.preventDefault()
  celsiusLink.classList.remove('active')
  fahrenheitLink.classList.add('active')
  let temperatureElement = document.querySelector('#current-temp')
  temperatureElement.textContent = `${Math.round(fahrenheitTemperature)}°`
}

function displayCTemperature(event) {
  event.preventDefault()
  fahrenheitLink.classList.remove('active')
  celsiusLink.classList.add('active')
  let temperatureElement = document.querySelector('#current-temp')
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9
  temperatureElement.textContent = `${Math.round(celsiusTemperature)}°`
}

let fahrenheitTemperature = null

let fahrenheitLink = document.querySelector('#fahrenheit-switch')
fahrenheitLink.addEventListener('click', displayFTemperature)

let celsiusLink = document.querySelector('#celsius-switch')
celsiusLink.addEventListener('click', displayCTemperature)

//update wind speed
function displayWindSpeed(response) {
  let windElement = Math.round(response.data.wind.speed)
  let currentSpeed = document.querySelector('#windSpeed')
  currentSpeed.innerHTML = `${windElement} mph`
}

axios.get(apiUrl).then(displayWindSpeed)

//update humidity
function displayHumidity(response) {
  let humidityElement = response.data.main.humidity
  let currentHumidity = document.querySelector('#humidityPercent')
  currentHumidity.innerHTML = `${humidityElement}%`
}

axios.get(apiUrl).then(displayHumidity)

//update weather icon
function displayWeatherIcon(response) {
  let iconKey = response.data.weather[0].icon
  let iconElement = document.querySelector('#icon')
  iconElement.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${iconKey}.png`,
  )
}

axios.get(apiUrl).then(displayWeatherIcon)

//update date
function changeDate() {
  let now = new Date()
  let date = now.getDate()
  now.getDate()
  now.getDay()
  now.getMonth()
  now.getFullYear()
  let months = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]
  let month = months[now.getMonth()]

  let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
  let day = days[now.getDay()]
  let year = now.getFullYear()

  let todayDate = document.querySelector('#date')
  todayDate.innerHTML = `${day} ${month} ${date}, ${year}`
}
changeDate()

//update hours
function changeHours() {
  let now = new Date()
  let date = now.getDate()
  now.getMinutes()
  now.getHours()
  let hours = now.getHours()
  if (hours > 12) {
    hours = `${hours - 12}`
  }
  if (hours < 10) {
    hours = `0${hours}`
  }
  if (hours > 12) {
    hours = `${hours - 12}`
  }
  let minutes = now.getMinutes()
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  let currentTime = document.querySelector('#time')
  currentTime.innerHTML = `${hours}:${minutes}`
}
changeHours()

// search city and update name
function search(event) {
  event.preventDefault()

  let h2 = document.querySelector('h2')
  let input = searchInput.value
  let modInput = input[0].toUpperCase() + input.slice(1)
  if (searchInput.value) {
    h2.textContent = modInput
  }
  //change temp, humidity, wind speed according to searched city
  let newApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&appid=dff5c692192605ee5ed7f95b423ae857`

  function displayNewWeather(response) {
    let newTemperature = Math.round(response.data.main.temp)
    let h1 = document.querySelector('h1')
    h1.innerHTML = `${newTemperature}°`
  }
  axios.get(newApiUrl).then(displayNewWeather)

  //update wind speed according to searched city
  function displayNewWindSpeed(response) {
    let newWindElement = Math.round(response.data.wind.speed)
    let currentSpeed = document.querySelector('#windSpeed')
    currentSpeed.innerHTML = `${newWindElement} mph`
  }

  axios.get(newApiUrl).then(displayNewWindSpeed)

  //update humidity according to searched city
  function displayNewHumidity(response) {
    let newHumidityElement = response.data.main.humidity
    let currentHumidity = document.querySelector('#humidityPercent')
    currentHumidity.innerHTML = `${newHumidityElement}%`
  }

  axios.get(newApiUrl).then(displayNewHumidity)

  //update weather icon according to searched city
  function displayNewWeatherIcon(response) {
    let newIconKey = response.data.weather[0].icon
    let newIconElement = document.querySelector('#icon')
    newIconElement.setAttribute(
      'src',
      `https://openweathermap.org/img/wn/${newIconKey}.png`,
    )
  }

  axios.get(newApiUrl).then(displayNewWeatherIcon)

  function getNewCoords(response) {
    let newCoords = response.data.coord
    console.log(newCoords)
  }
  axios.get(apiUrl).then(getNewCoords)
}

let form = document.querySelector('#search-form')
form.addEventListener('submit', search)
let searchInput = document.querySelector('#search-input')

//display Forecast
function displayForecast() {
  let forecastElement = document.querySelector('#weatherForecast')

  let forecastHTML = `<div class="row">`
  let days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
                                <div id="weather-forecast-day">
                                    ${day}
                                </div>
                                <img src="https://openweathermap.org/img/wn/10d@2x.png" id="forecast-icon">
                                <h6 id="forecast-temp">
                                    <span id="forecast-temp-max">45° </span>|
                                        <span id="forecast-temp-min">5°</span>
                                </h6>
                            </div>`
  })

  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML

  //automatically call city coords
  function getCoord(response) {
    let lat = response.data.coord.lat
    let lon = response.data.coord.lon
    let coordApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
    console.log(coordApiUrl)
  }
  axios.get(apiUrl).then(getCoord)
}

displayForecast()
//Get the data for the Forecast
