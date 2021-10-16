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
    updateTemp(round(data.main.temp));
    updateTempHigh(round(data.main.temp_max));
    updateTempLow(round(data.main.temp_min));
    updateTempFeels(round(data.main.feels_like));
    updateLocationCity(data.name);
    updateLocationCountry(data.sys.country);
    updateCloudText(data.weather[0].description);
    updateCloudIcon(data.weather[0].icon);
    updateWindSpeed(round(data.wind.speed));
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

function round(num) {
    return Math.round(num * 10) / 10;
}

function updateWeather() {
    let input = document.getElementById("search-input");
    if (input.value.length > 0) {
        fetchWeatherData(input.value);
        input.value = "";
        input.blur();
    }
}

function handleEnter() {
    let input = document.getElementById("search-input");
    input.addEventListener("keydown", function (event) {
        if (event.key === 'Enter') {
            // remove focus to trigger event
            input.blur();
            }
    });
}

function handleFocusLost() {
    let input = document.getElementById("search-input");
    input.addEventListener("focusout", () => updateWeather());
}

function initLoad() {
    handleEnter();
    handleFocusLost();
    fetchWeatherData("London");
}

window.onload = initLoad();