import * as dom from './dom.js';

async function getWeatherData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=6f2b9a56099670677b7914027874d332`;

  try {
    const response = await fetch(url, {mode: 'cors'});
    if (!response.ok) throw new Error("Unable to fetch data");
    const data = await response.json();
    console.table(data);
    return {
      location: data.name,
      weather: data.weather[0].main,
      desc: data.weather[0].description,
      temp: Math.round(data.main.temp - 273.15),
      wind: Math.round(data.wind.speed * (3600/1609)),
    }
  } catch(error) {
    alert(error); 
    console.error(error);
  }
}

async function displayData(location) {
  const data = await getWeatherData(location);
  console.table(data);
  dom.place.innerText = (data.location);
  dom.weather.innerText = (data.desc);
  console.log(dom.tempSwitch.checked);
  if (dom.tempSwitch.checked) {
    dom.temp.innerText = (`${Math.round(data.temp * 1.8) + 32} °F`);
  } else dom.temp.innerText = (`${data.temp} °C`);
  if (dom.windSwitch.checked) {
    dom.wind.innerText = (`${data.wind} mph`);
  } else {
    dom.wind.innerText = (`${Math.round(data.wind * (1609/3600))} m/s`);
  }
  return data;
}

dom.getLocationBtn.addEventListener('click', () => {
  displayData(dom.location.value)
    .then(res => setBackground(res))
})

function setBackground(data) {
  console.log(data.weather);
  switch (data.weather) {
    case 'Clear':
      document.body.style['background-image'] = "url('./img/clear.jpg')";
      break;
    case 'Clouds':
      document.body.style['background-image'] = "url('./img/cloud.jpg')";
      break;
    case 'Rain':
      document.body.style['background-image'] = "url('./img/rain.jpg')";
      break;
    case 'Snow':
      document.body.style['background-image'] = "url('./img/snow.jpg')";
      break;
    default:
      document.body.style['background-image'] = "url('./img/default.jpg')";
  }
}

