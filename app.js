const api = `4766ab06abd2ece4824d869a3bb1af09`;

//Get all the DOM Elements
const iconEle = document.querySelector('.icon');
const cityEle = document.querySelector('.city');
const tempEle = document.querySelector('.temp');
const minTempEle = document.querySelector('.minTemp');
const maxTempEle = document.querySelector('.maxTemp');
const descriptionEle = document.querySelector('.description');
const humidityEle = document.querySelector('.humidity');
const windEle = document.querySelector('.wind');
const bodyEle = document.querySelector('body');
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('#btn');
const locationBtn = document.querySelector('#locate');
const dayEle = document.querySelector('.day');


//Reset DOM Elements
resetDOM = () => {
    iconEle.src = ""
    cityEle.innerText = "";
    tempEle.innerText = "";
    descriptionEle.innerText = "";
    humidityEle.innerText = "";
    windEle.innerText = "";
    minTempEle.innerText = "";
    maxTempEle.innerText = "";
};


//Get user location coordinates
getCoords = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            getWeatherByCoord(lat, long);
        }, () => {
            resetDOM();
            descriptionEle.innerText = "Location access is turned off\nPlease reset the permission";
        });
    }
    else {
        document.querySelector('.city').innerText = "GeoLocation not available"
    }
};
getCoords();


//Get the API by User's Location
getWeatherByCoord = (lat, long) => {
    resetDOM();
    tempEle.innerText = "Loading...";

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${api}`)
        .then((res) => res.json())
        .then((data) => showWeather(data))
};


//Get the API by City Name
getWeatherByName = (cityName) => {
    resetDOM();
    tempEle.innerText = "Loading...";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api}`)
        .then((res) => res.json())
        .then((data) => showWeather(data))
        .catch(() => {
            resetDOM();
            tempEle.innerText = "City not found :(";

        })

};


//Display the Weather on the page
showWeather = (data) => {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const wind = data.wind.speed;
    const minTemp = data.main.temp_min;
    const maxTemp = data.main.temp_max;
    console.log(data);

    bodyEle.style.backgroundImage = `url('https://source.unsplash.com/random/${window.innerWidth}x${window.innerHeight}/?${cityName}')`;
    iconEle.src = "http://openweathermap.org/img/wn/" + icon + ".png"
    cityEle.innerText = `${cityName}, ${data.sys.country}`;
    tempEle.innerText = temperature + "°C";
    minTempEle.innerHTML = `Min: ${minTemp}°C`;
    maxTempEle.innerText = `Max: ${maxTemp}°C`;
    descriptionEle.innerText = description;
    humidityEle.innerText = "Humidity: " + humidity + "%";
    windEle.innerText = "Wind: " + wind + " m/s";
    dayEle.innerText = dateTime();
};


// Event Listener on Location Button
locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        getCoords();
    }
});

//Event Listener on Search Bar
searchBar.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        if (searchBar.value === "") {
            //pass
        }
        else {
            getWeatherByName(searchBar.value);
            searchBar.value = "";
        }

    }
});

//Event Listener on Search Button
searchBtn.addEventListener('click', () => {
    if (searchBar.value === "") {
        //pass
    }
    else {
        getWeatherByName(searchBar.value);
        searchBar.value = "";
    }
});


//Find the Date and Day
dateTime = () => {
    let day = weekDay();
    let date = new Date().getDate();
    let month = monthName();
    return `${day}, ${date} ${month}`;

}

//Find Weekday
weekDay = () => {
    switch (new Date().getDay()) {
        case 0:
            return "Sunday";

        case 1:
            return "Monday";

        case 2:
            return "Tuesday";

        case 3:
            return "Wednesday";

        case 4:
            return "Thursday";

        case 5:
            return "Friday";

        case 6:
            return "Saturday";
    }
}

//Find Month
monthName = () => {
    switch (new Date().getMonth()) {
        case 0:
            return "Jan";

        case 1:
            return "Feb";

        case 2:
            return "Mar";

        case 3:
            return "Apr";

        case 4:
            return "May";

        case 5:
            return "Jun";

        case 6:
            return "Jul";

        case 7:
            return "Aug";

        case 8:
            return "Sep";

        case 9:
            return "Oct";

        case 10:
            return "Nov";

        case 11:
            return "Dec";

    }
}