let units = 'metric';
let unit = 'C';
let loading = false;

let temp_main = document.getElementById('temp-main');
let temp_high = document.getElementById('temp-high');
let temp_low = document.getElementById('temp-low');
let temp_feels = document.getElementById('temp-feels');
let location_city = document.getElementById('location-city');
let location_country = document.getElementById('location-country');
let cloud_text = document.getElementById('cloud-text');
let cloud_icon = document.getElementById('cloud-icon');
let info_wind = document.getElementById('info-wind');
let info_humidity = document.getElementById('info-humidity');
let info_pressure = document.getElementById('info-pressure');


function fetchWeatherData(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + city + '&appid=761a138e4e3ff0894d5d412bd9085bd2&units='
        + units, { mode: "cors" })
        .then(response => response.json())
        .then(data => update(data))
        .catch(err => console.log(err));
}


function update(data) {
    loading = false;
    if (data.cod !== 200) {
        setNotFound();
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
    temp_main.textContent = temp + "°" + unit;
}

function updateTempHigh(temp) {
    temp_high.textContent = temp + "°";
}

function updateTempLow(temp) {
    temp_low.textContent = temp + "°";
}

function updateTempFeels(temp) {
    temp_feels.textContent = temp + "°";
}

function updateLocationCity(city) {
    if(city.length > 18) {
        location_city.classList.add('text-location-small');
        location_country.classList.add('text-location-small');
    } else {
        location_city.classList.remove('text-location-small');
        location_country.classList.remove('text-location-small');
    }
    location_city.textContent = city;
}

function updateLocationCountry(country) {
    if (country)
        location_country.textContent = ", " + country;
    else location_country.textContent = "";
}

function updateCloudText(text) {
    // Capitalize first letter
    text = text.charAt(0).toUpperCase() + text.slice(1);
    cloud_text.textContent = text;
}

function updateCloudIcon(icon) {
    cloud_icon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

function updateWindSpeed(speed) {
    info_wind.textContent = speed + " m/s";
}

function updateHumidity(humidity) {
    info_humidity.textContent = humidity + "%";
}

function updatePressure(pressure) {
    info_pressure.textContent = pressure + "mb";
}

function round(num) {
    return Math.round(num * 10) / 10;
}

function updateWeather() {
    let input = document.getElementById("search-input");
    if (input.value.length > 0 && !loading) {
        fetchWeatherData(input.value);
        setLoading();
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

function setLoading() {
    loading = true;
    location_city.textContent = "Loading";
    location_country.textContent = "...";
    temp_main.textContent = "...";
    temp_high.textContent = "...";
    temp_low.textContent = "...";
    temp_feels.textContent = "...";
    cloud_text.textContent = "...";
    info_wind.textContent = "...";
    info_humidity.textContent = "...";
    info_pressure.textContent = "...";
}

function setNotFound() {
    location_city.textContent = "Not Found";
    location_country.textContent = "";
}

function initLoad() {
    handleEnter();
    handleFocusLost();
    setLoading();
    fetchWeatherData("London");
}

window.onload = initLoad();