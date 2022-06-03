const axios = require('axios').default;
const getDataBtn = document.querySelector('#input-btn')
const aiportIdInput = document.querySelector('#icao-input')
const showWeatherDiv = document.querySelector('#show-weather-div')
const token = 'UlxGAfwTK_wRXcEd03yEOtgMRVtTTJXO6VJjjUyWjcA'
let metar = localStorage.getItem('metar')
let taf = localStorage.getItem('taf')


function getMetars(icao) {
   
    axios.get(`https://avwx.rest/api/metar/${icao}`, {
    headers: {
        Authorization: 'BEARER ' + token
    }
    })
  .then(function (response) {
    console.log(response.data.raw);
    localStorage.setItem('metar', response.data.raw)
    showWeatherDiv.innerHTML += `<p>METAR: ${response.data.raw}</p>`
    console.log('metar: ', metar)
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function() {
    
  })
}

function getTafs(icao) {
    axios.get(`https://avwx.rest/api/taf/${icao}`, {
    headers: {
        Authorization: 'BEARER ' + token
    }
    })
  .then(function (response) {
    console.log(response.data);
    localStorage.setItem('taf', response.data.raw)
    showWeatherDiv.innerHTML += `<p>TAF: ${response.data.raw}</p>`
    
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
   
  })
}

function getData() {
    getMetars(aiportIdInput.value)
    getTafs(aiportIdInput.value)
    aiportIdInput.value = ''
    showWeatherDiv.innerHTML = ''
}

getDataBtn.addEventListener('click', () => {
    localStorage.clear()
    getData()
})

aiportIdInput.addEventListener('keypress', (event) => {
    localStorage.clear()
    if(event.key === 'Enter') {
        event.preventDefault()
        getData()
    }
})
console.log('metar: ', metar)
if(metar !== null) {
    showWeatherDiv.innerHTML += `<p>METAR: ${metar}</p>`
    showWeatherDiv.innerHTML += `<p>TAF: ${taf}</p>`
}
