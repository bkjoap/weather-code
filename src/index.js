let axiosUrl = 'https://jsonplaceholder.typicode.com/comments/'
let apiKey = 'dff5c692192605ee5ed7f95b423ae857'
let apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?q=chicago&units=imperial&appid=dff5c692192605ee5ed7f95b423ae857'

//update weather
function displayTemperature(response) {
  let tempElement = Math.round(response.data.main.temp)
  let currentTemp = document.querySelector('#current-temp')
  currentTemp.innerHTML = `${tempElement}°`
}

axios.get(apiUrl).then(displayTemperature)
