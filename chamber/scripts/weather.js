const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const tempMax = document.querySelector("#temp-max");
const tempMin = document.querySelector("#temp-min");
const humidity = document.querySelector("#humidity");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const weatherIcon = document.querySelector("#weather-icon");
const forecastList = document.querySelector("#forecast-list");

const currentUrl = "https://api.openweathermap.org/data/2.5/weather?lat=14.58&lon=121.00&units=metric&appid=44ca9e32224831469aa5d7aae9fe9877";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=14.58&lon=121.00&units=metric&appid=44ca9e32224831469aa5d7aae9fe9877";

async function getWeather() {
    const response = await fetch(currentUrl);
    if (!response.ok) throw new Error("Weather data not available");
    const data = await response.json();

    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const max = data.main.temp_max;
    const min = data.main.temp_min;
    const hum = data.main.humidity;
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    currentTemp.textContent = `${temperature}°C`;
    weatherDesc.textContent = description;
    tempMax.textContent = `${max}°C`;
    tempMin.textContent = `${min}°C`;
    humidity.textContent = `${hum}%`;
    sunrise.textContent = sunriseTime;
    sunset.textContent = sunsetTime;

    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.alt = description;
}

async function getForecast() {
    const response = await fetch(forecastUrl);
    if (!response.ok) throw new Error("Forecast data not available");
    const data = await response.json();

    const dailyMap = {};

    data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyMap[date]) {
            dailyMap[date] = [];
        }
        dailyMap[date].push(item.main.temp);
    });

    const days = Object.keys(dailyMap).slice(0, 3);

    forecastList.innerHTML = "";
    days.forEach(date => {
        const temps = dailyMap[date];
        const avg = (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1);
        const label = new Date(date).toLocaleDateString("en-US", { weekday: "long" });
        const li = document.createElement("li");
        li.textContent = `${label}: ${avg}°C`;
        forecastList.appendChild(li);
    });
}

getWeather();
getForecast();