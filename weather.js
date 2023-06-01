const apiKey = "597c40c39084687093b091cd48b366f8";
let latitude;
let longitude;
function showCityTemperature(response) {
  let city = document.querySelector(".city-search").value;
  console.log(response.data.main.temp);
  const cityTemp = response.data.main.temp;
  const cityTempRound = Math.round(cityTemp);
  const weatherStatus = response.data.weather[0].description;
  document.querySelector(".degrees-number").innerHTML = `${cityTempRound}°C `;
  document.querySelector(".weather").innerHTML = `${weatherStatus}`;
  document.querySelector(".city-name").innerHTML = `${response.data.name}`;
}
function handlePosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}
function showLocalTemperature() {
  const apiLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiLocation).then(showCityTemperature);
}
navigator.geolocation.getCurrentPosition(handlePosition);

const date = new Date();
const min = date.getMinutes();
const hours = date.getHours();
const day = date.getDay();
const data = date.getDate();
const dateElement = document.querySelector(".date");
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
dateElement.innerHTML = `${days[day]}, ${hours}:${min}`;

function search(city) {
  city.preventDefault();
  let input = document.querySelector(".city-search");
  let cityElement = document.querySelector(".city-name");
  console.log(input.value);
  cityElement.innerHTML = `${input.value}`;
  const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;
  axios.get(requestUrl).then(showCityTemperature);
}
const form = document.querySelector("form");
form.addEventListener("submit", search);
const button = document.querySelector(".btn.btn-info");
button.addEventListener("click", showLocalTemperature);
