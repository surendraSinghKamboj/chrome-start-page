// weather.js
document.addEventListener("DOMContentLoaded", () => {
  const apiKeyInput = document.getElementById("apiKey");
  const locationInput = document.getElementById("location");
  const saveBtn = document.getElementById("saveSettings");
  const weatherInfo = document.querySelector(".weather-info");
  const settingsDiv = document.querySelector(".settings");

  const locationName = document.getElementById("locationName");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  const savedApiKey = localStorage.getItem("weatherApiKey");
  const savedLocation = localStorage.getItem("weatherLocation");

  if (savedApiKey) {
    apiKeyInput.style.display = "none";
  } else {
    apiKeyInput.style.display = "block";
  }

  if (savedLocation) locationInput.value = savedLocation;

  const fetchWeather = async (key, city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
      const data = await response.json();
      if (data.cod !== 200) throw new Error(data.message);

      weatherInfo.style.display = "block";
      locationName.textContent = `📍 ${data.name}, ${data.sys.country}`;
      temperature.textContent = `🌡 Temperature: ${data.main.temp} °C`;
      description.textContent = `☁️ ${data.weather[0].description}`;
      humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
      wind.textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;

      if (apiKeyInput) apiKeyInput.style.display = "none";
    } catch (err) {
      alert("Error fetching weather: " + err.message);
    }
  };

  saveBtn.addEventListener("click", () => {
    const apiKey = apiKeyInput.value.trim() || savedApiKey;
    const city = locationInput.value.trim();

    if (apiKey && city) {
      if (!savedApiKey) localStorage.setItem("weatherApiKey", apiKey);
      localStorage.setItem("weatherLocation", city);
      fetchWeather(apiKey, city);
    } else {
      alert("Please provide both API key and location.");
    }
  });

  if (savedApiKey && savedLocation) {
    fetchWeather(savedApiKey, savedLocation);
  }
});
