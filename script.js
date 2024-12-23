function getWeather() {
  const apiKey = '4e6084f24e78521a85ecb612c7e2441e'; 
  const city = document.getElementById('city').value;

  if (!city) {
    alert('Please enter a city');
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  // Fetch current weather
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching current weather data:', error);
      alert('Error fetching current weather data. Please try again.');
    });

  // Fetch hourly forecast
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayHourlyForecast(data.list);
    })
    .catch(error => {
      console.error('Error fetching hourly forecast data:', error);
      alert('Error fetching hourly forecast data. Please try again.');
    });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfoDiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');

  // Clear previous content
  weatherInfoDiv.innerHTML = '';
  tempDivInfo.innerHTML = '';

  if (data.cod === '404') {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML = `<p>${cityName}: ${description}</p>`;
    weatherIcon.src = iconUrl;
    weatherIcon.style.display = 'block';
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  hourlyForecastDiv.innerHTML = ''; // Clear previous content

  hourlyData.slice(0, 8).forEach(hour => {
    const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const temp = Math.round(hour.main.temp - 273.15);
    const iconCode = hour.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const hourlyItem = document.createElement('div');
    hourlyItem.className = 'hourly-item';

    hourlyItem.innerHTML = `
      <p>${time}</p>
      <img src="${iconUrl}" alt="${hour.weather[0].description}">
      <p>${temp}°C</p>
    `;

    hourlyForecastDiv.appendChild(hourlyItem);
  });
}