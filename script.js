let units = 'metric';
let unit = 'C';


function fetchWeatherData(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=761a138e4e3ff0894d5d412bd9085bd2&units=' + units, { mode: "cors" })
        .then(response => response.json())
        .then(data => update(data))
        .catch(err => console.log(err));
}


function update(data) {
    if (data.cod !== 200) {
        console.log('Failed to fetch weather data');
        return;
    }
    updateTemp(Math.round(data.main.temp * 10) / 10);
    updateTempHigh(Math.round(data.main.temp_max * 10) / 10);
    updateTempLow(Math.round(data.main.temp_min * 10) / 10);
    updateTempFeels(Math.round(data.main.feels_like * 10) / 10);
    updateLocationCity(data.name);
    updateLocationCountry(data.sys.country);
    updateCloudText(data.weather[0].description);
    updateCloudIcon(data.weather[0].icon);
    updateWindSpeed(Math.round(data.wind.speed * 10) / 10);
    updateHumidity(data.main.humidity);
    updatePressure(data.main.pressure);
}

function updateTemp(temp) {
    document.getElementById('temp-main').textContent = temp + "°" + unit;
}

function updateTempHigh(temp) {
    document.getElementById('temp-high').textContent = temp + "°" + unit;
}

function updateTempLow(temp) {
    document.getElementById('temp-low').textContent = temp + "°" + unit;
}

function updateTempFeels(temp) {
    document.getElementById('temp-feels').textContent = temp + "°" + unit;
}

function updateLocationCity(city) {
    document.getElementById('location-city').textContent = city;
}

function updateLocationCountry(country) {
    document.getElementById('location-country').textContent = country;
}

function updateCloudText(text) {
    // Capitalize first letter
    text = text.charAt(0).toUpperCase() + text.slice(1);
    document.getElementById('cloud-text').textContent = text;
}

function updateCloudIcon(icon) {
    document.getElementById('cloud-icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

function updateWindSpeed(speed) {
    document.getElementById('info-wind').textContent = speed + " m/s";
}

function updateHumidity(humidity) {
    document.getElementById('info-humidity').textContent = humidity;
}

function updatePressure(pressure) {
    document.getElementById('info-pressure').textContent = pressure;
}

function handleEnter() {
    let input = document.getElementById("search-input");
    input.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (input.value.length > 0) {
                fetchWeatherData(input.value);
                input.value = "";
            }
        }
    });
}

function initLoad() {
    handleEnter();
    fetchWeatherData("London");
}

window.onload = initLoad();