async function getWeatherData() {
  const location = 'Hartlepool';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=6f2b9a56099670677b7914027874d332`;

  try {
    const response = await fetch(url, {mode: 'cors'});
    if (!response.ok) throw new Error("Unable to fetch data");
    const data = await response.json();
    console.log(data);
    console.log(data.name, data.sys.country);
    console.log(data.weather[0].main);
    console.log(`${Math.round(data.main.temp - 273.15)}℃`);
    console.log(data.weather[0].description);
    console.log(`${Math.round(data.wind.speed * (3600/1609))} mph`);
  } catch(error) {
    console.error(error);
  }
}

getWeatherData();