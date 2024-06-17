// * reference of weather main data

let cityName = document.querySelector('.weather_city');
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector('.weather_feelsLike');
let w_humidity = document.querySelector('.weather_humidity');
let w_wind = document.querySelector('.weather_wind');
let w_pressure = document.querySelector('.weather_pressure');

let citySearch = document.querySelector('.weather_search');

//* To extract country name by region 
const getCountryName = (code) => {
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}
//* to get the date & time
const getDateTime = (dt) => {
    const curDate = new Date(dt * 1000);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(curDate);
    return formattedDate;
}

//search functionality
citySearch.addEventListener('submit', (e) => {
    e.preventDefault();

    let cityName = document.querySelector(".city_name");
    getWeatherData(cityName.value);
    cityName.value = "";
})

const getWeatherData = async (city = "Madhubani") => {
    try {
        const apiKey = 'INSERT_YOUR_API_KEY_HERE';
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=apiKey`
        const res = await fetch(apiUrl);
        const data = await res.json();

        const { main, name, weather, wind, sys, dt } = data;
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
        dateTime.innerHTML = getDateTime(dt);
        w_forecast.innerHTML = weather[0].main;
        w_icon.innerHTML = `<img class="image" src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>`;

        w_temperature.textContent = Math.floor(main.temp - 273) + '°C';
        w_minTem.textContent = `Min: ${Math.floor(main.temp_min - 273)}°C`
        w_maxTem.textContent = `Max: ${Math.floor(main.temp_max - 273)}°C`

        w_feelsLike.textContent = Math.floor(main.feels_like - 273) + '°C';
        w_humidity.textContent = `${main.humidity}%`
        w_wind.textContent = wind.speed + 'm/s';

        let pressureInHg = (main.pressure * 0.02953).toFixed(2);
        w_pressure.textContent = `${pressureInHg} inHg`;
    } catch (error) {
        console.log(error)
    }
}
document.body.addEventListener('load', getWeatherData());