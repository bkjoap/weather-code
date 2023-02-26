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
  let searchInput = document.querySelector('#search-input')

  let h2 = document.querySelector('h2')
  if (searchInput.value) {
    h2.textContent = searchInput.value
  }
}

let form = document.querySelector('#search-form')
form.addEventListener('submit', search)
