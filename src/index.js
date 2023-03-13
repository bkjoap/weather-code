let apiKey = 'dff5c692192605ee5ed7f95b423ae857'

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
  let searchInput = document.querySelector('#search-input')
  let input = searchInput.value
  let modInput = input[0].toUpperCase() + input.slice(1)
  if (searchInput.value) {
    h2.textContent = modInput
  }

  searchCity(input)
}

function searchCity(city) {
  //change temp, humidity, wind speed according to searched city
  let newApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=dff5c692192605ee5ed7f95b423ae857`

  axios.get(newApiUrl).then(displayNewWeather)
}

function displayNewWeather(response) {
  let newTemperature = Math.round(response.data.main.temp)
  let h1 = document.querySelector('h1')
  h1.innerHTML = `${newTemperature}°`
  fahrenheitTemperature = response.data.main.temp
  let newWindElement = Math.round(response.data.wind.speed)
  let currentSpeed = document.querySelector('#windSpeed')
  currentSpeed.innerHTML = `${newWindElement} mph`
  let newHumidityElement = response.data.main.humidity
  let currentHumidity = document.querySelector('#humidityPercent')
  currentHumidity.innerHTML = `${newHumidityElement}%`
  let newIconKey = response.data.weather[0].icon
  let newIconElement = document.querySelector('#icon')
  newIconElement.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${newIconKey}.png`,
  )

  getCoord(response.data.coord)
}

let form = document.querySelector('#search-form')
form.addEventListener('submit', search)

searchCity('chicago')

//Get the data for the Forecast

function getCoord(coord) {
  let lat = coord.lat
  let lon = coord.lon
  let coordApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  axios.get(coordApiUrl).then(getDailyForecast)
}

//pretty much the entire forecast coding
function getDailyForecast(response) {
  let forecast = response.data.daily
  console.log(forecast)

  // get the correct weekday for the forecast
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000)
    let day = date.getDay()
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

    return days[day]
  }
  //display Forecast
  function displayForecast() {
    let forecastElement = document.querySelector('#weatherForecast')

    let forecastHTML = `<div class="row">`
    let days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

    forecast.forEach(function (forecastDay) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
                                <div id="weather-forecast-day">
                                    ${formatDay(forecastDay.dt)}
                                </div>
                                <img src="https://openweathermap.org/img/wn/${
                                  forecastDay.weather[0].icon
                                }@2x.png" id="forecast-icon">
                                <h6 id="forecast-temp">
                                    <span id="forecast-temp-max">${Math.round(
                                      forecastDay.temp.max,
                                    )}° </span>|
                                        <span id="forecast-temp-min">${Math.round(
                                          forecastDay.temp.min,
                                        )}°</span>
                                </h6>
                            </div>`
    })

    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML
  }
  displayForecast()
}
