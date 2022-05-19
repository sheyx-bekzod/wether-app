const backend = {
  apiKey:'443cc3d1fedfba8ff7a8c6de8377ce41',
  baseUrl: 'https://api.openweathermap.org/data/2.5/'
}
const body = document.querySelector('body')

const search = document.querySelector(".search")
console.log(search);

search.addEventListener("keyup",getValue)

function getValue(e) {
  if (e.keyCode == 13) {
    console.log(search.value);
    fetchValue(search.value)
    search.value = ""
  }
}

function fetchValue(query) {
  fetch(`${backend.baseUrl}weather?q=${query}&units=metric&APPID=${backend.apiKey}`)
  .then(data => data.json())
  .then(data => getWheather(data))
}

function getWheather(wheather) {
  console.log(wheather);
  deleteClass()
    let name = document.querySelector('.content_header'),
      // countr = document.querySelector('.content_header span'),
      temp = document.querySelector('.temp'),
      maxTemp = document.querySelector('.max-temp'),
      type = document.querySelector('.type'),
      minTemp = document.querySelector('.min-temp')
      if (wheather.weather && wheather.main) {
        name.innerHTML = wheather.name
        temp.innerHTML = `${Math.round(wheather.main.temp)} C`
        maxTemp.innerHTML = `${Math.round(wheather.main.temp_max)} C/`
        type.innerHTML = wheather.weather[0].main
        minTemp.innerHTML = `${Math.round(wheather.main.temp_min)} C`
        
        if(wheather.weather[0].main === 'Clouds'){
          body.classList.add('clouds')
        }else if (wheather.weather[0].main === 'Rain'){
          body.classList.add('rain')      
        }else if (wheather.weather[0].main === 'Clear'){
          body.classList.add('clear')
        }
      }else{
        name.innerHTML = 'City is not found...'
        temp.innerHTML = ``
        maxTemp.innerHTML = ``
        type.innerHTML = ''
        minTemp.innerHTML = `` 
      }
}

function deleteClass() {
  body.classList.remove('clouds')
  body.classList.remove('rain')
  body.classList.remove('clear')
  
}