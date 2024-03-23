const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");

const API_KEY = "c040b9c80c125695718f8bcb4614cc07";

const getWeatherDetails = (cityName, lat, lon) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(API_URL).then(res => res.json()).then(data => {

        const singleForecastDays = [];
        const weeklyForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!singleForecastDays.includes(forecastDate)) {
                return singleForecastDays.push(forecastDate);
            }
        });

        console.log(singleForecastDays);
    }).catch(() => {
        alert("Error occured when fetching forecast");
    });
}

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if(!cityName) return;
    const GEO_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;

    fetch(GEO_API_URL).then(res => res.json()).then(data => {
        if(!data.length) return alert(`Coordinates not found for ${cityName}`);
        const {name, lat, lon} = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("Error occured when fetching coordinates");
    })
}



searchButton.addEventListener("click", getCityCoordinates);
