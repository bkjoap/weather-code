let axiosUrl = 'https://jsonplaceholder.typicode.com/comments/'
let apiKey = 'dff5c692192605ee5ed7f95b423ae857'
let apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?q=chicago&units=imperial&appid=dff5c692192605ee5ed7f95b423ae857'

//update weather temperature
function displayTemperature(response) {
  let tempElement = Math.round(response.data.main.temp)
  let currentTemp = document.querySelector('#current-temp')
  currentTemp.innerHTML = `${tempElement}°`
}

axios.get(apiUrl).then(displayTemperature)

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

//update date
