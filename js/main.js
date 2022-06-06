/*select forecast container */
let forecastContainer = document.querySelector(".forecast-container"),
  searchInput = document.querySelector("input.search");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const windDirection = {
  N: "North",
  NNE: "North-Northeast",
  NE: "Northeast",
  ENE: "East-Northeast",
  E: "East",
  ESE: "East-Southeast",
  SE: "Southeast",
  SSE: "South-Southeast",
  S: "South",
  SSW: "South-Southwest",
  SW: "Southwest	225°",
  WSW: "West-Southwest",
  W: "West",
  WNW: "West-Northwest",
  NW: "Northwest",
  NNW: "North-Northwest",
};

/*get weathe fetch the data from api and call functions to display today and next 2 days weather*/
async function getWeather(country) {
  let weatherRequest =
    await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f300af69aba640d28a4183335220606&q=${country}&days=3&aqi=yes&alerts=yes
  `);
  if (weatherRequest.status == 200) {
    let response = await weatherRequest.json();
    let nextDays = response.forecast.forecastday;
    displayTodayWeather(response);
    displayNextWeather(nextDays);
  }
}
getWeather("cairo");

/*display today weather from the object create first div and display it */
function displayTodayWeather(response) {
  let currentDate = new Date(response.current.last_updated);
  let currentDiv = `<div class="today col-lg-4 col-md-6 p-0">
  <div class="forecast-header d-flex justify-content-between">
    <div class="day">${days[currentDate.getDay()]}</div>
    <div class="date">${currentDate.getDate()} ${months[currentDate.getMonth()]}
    </div>
  </div>
  <div class="forecast-info p-3">
    <div class="location">${response.location.name}, ${
    response.location.country
  }
    </div>
    <div class="degree d-flex me-3">
      <div class="number text-white fw-bold">${
        response.current.temp_c
      }<sup>o</sup>C</div>
      <img src="https://${response.current.condition.icon}"/>
    </div>
    <div class="forecast-written my-3 text-primary">${
      response.current.condition.text
    }
    </div>
    <div>
      <img src="images/icon-umberella.png" class="img-fluid" />
      <p class="me-3 d-inline-block">${response.current.humidity}%</p>
      <img src="images/icon-wind.png" />
      <p class="me-3 d-inline-block">${response.current.wind_kph}km/h</p>
      <img src="images/icon-compass.png" />
      <p class="me-3 d-inline-block">${
        windDirection[response.current.wind_dir]
      }</p>
    </div>
    </div>
  </div>`;
  forecastContainer.innerHTML = currentDiv;
}

/*get weather of the next 2 days */
function displayNextWeather(nextDays) {
  for (let i = 1; i < nextDays.length; i++) {
    let currentDate = new Date(nextDays[i].date);
    let currentDiv = `<div class="today col-lg-4 col-md-6 p-0">
  <div class="forecast-header d-flex justify-content-center">
    <div class="day">${days[currentDate.getDay()]}</div>
  </div>
  <div class="forecast-info p-3">
    <div class="degree d-flex flex-wrap me-3 justify-content-center text-center">
      <img src="https://${nextDays[i].day.condition.icon}" />
      <div class="text-white fw-bold fs-3 w-100">${
        nextDays[i].day.maxtemp_c
      }<sup>o</sup>C</div>
      <div class="fs-5 w-100">${nextDays[i].day.mintemp_c}<sup>o</sup></div>
      <div class="forecast-written my-3 text-primary w-100">${
        nextDays[i].day.condition.text
      }
      </div>
    </div>

  </div>
</div>`;
    forecastContainer.innerHTML += currentDiv;
  }
}

searchInput.addEventListener("keyup", (e) => getWeather(e.target.value));
