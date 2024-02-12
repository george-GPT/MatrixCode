const city = document.getElementById("city");
const fetchWeatherButton = document.getElementById("fetchWeatherButton");
const weatherInfo = document.getElementById("weatherInfo");
const convertFrButton = document.getElementById("convertFrButton");
const convertClButton = document.getElementById("convertClButton");

// initial setup
city.innerText = "";
fetchWeatherButton.disabled = true;
convertFrButton.disabled = true;
convertClButton.disabled = true;

// WeatherButton settings
function userInput() {
  if (city.innerText !== "") {
    fetchWeatherButton.disabled = false;
  }
}

// Fetch weather API
function fetchApi() {
  const apiKey = "h6bfc520abd1c8c8508bf9bfc084b2ada";
  const url = "https://openweathermap.org/?api_key=${apiKey}`";
  
  fetch(url)
    .then (response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    return response.json();
    })
    .then (data => {
      weatherInfo.textContent = `The current weather in ${city} is ${data.value}`;
    })
    .catch(error => {
      weatherInfo.textContent = `Error: ${error.message}`;
    });

  6bfc520abd1c8c8508bf9bfc084b2ada


}

// temperature conversion
function convertFrButton

function convertClButton

// display the weather information on the webpage

// Event Handling
function eventHandling() {
  fetchWeatherButton.addEventListener("click", (fetchApi));   

  convertFrButton.addEventListener("click", (convertFr));

}
// add initializations/default settings
