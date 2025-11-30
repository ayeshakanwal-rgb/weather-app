const WEATHER_API_KEY = "c13983238e745e123d9f69cffdfa7f8e"; // Replace with your OpenWeatherMap API key

let appState = {
  tempCelsius: null,
  isFahrenheit: false,
  tzOffset: 0,
  darkMode: false,
  clockInterval: null
};

const DOM = {
  body: document.body,
  darkToggle: document.getElementById("darkModeToggle"),
  unitToggle: document.getElementById("tempUnitToggle"),
  cityInput: document.getElementById("cityField"),
  searchBtn: document.getElementById("searchBtn"),
  geoBtn: document.getElementById("geoBtn"),
  display: document.getElementById("weatherDisplay"),
  locationName: document.getElementById("locationName"),
  icon: document.getElementById("weatherIcon"),
  tempVal: document.getElementById("tempValue"),
  tempUnit: document.getElementById("tempUnit"),
  humidity: document.getElementById("humidityVal"),
  condition: document.getElementById("conditionDesc"),
  clock: document.getElementById("cityTime"),
  errorMsg: document.getElementById("weatherError"),
  bgContainer: document.getElementById("bgContainer")
};

initApp();

function initApp() {
  DOM.darkToggle.addEventListener("change", toggleDarkMode);
  DOM.unitToggle.addEventListener("change", toggleUnit);
  DOM.searchBtn.addEventListener("click", searchCity);
  DOM.geoBtn.addEventListener("click", searchByLocation);
}

// Dark mode toggle
function toggleDarkMode() {
  appState.darkMode = DOM.darkToggle.checked;
  DOM.body.classList.toggle("dark", appState.darkMode);
}

// Celsius / Fahrenheit toggle
function toggleUnit() {
  appState.isFahrenheit = DOM.unitToggle.checked;
  renderTemperature();
}

// Search weather by city
async function searchCity() {
  const city = DOM.cityInput.value.trim();
  if (!city) return;
  await fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`);
}

// Search weather by geolocation
function searchByLocation() {
  if (!navigator.geolocation) {
    showError("Geolocation not supported!");
    return;
  }
  navigator.geolocation.getCurrentPosition(async pos => {
    const { latitude, longitude } = pos.coords;
    await fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
  }, () => showError("Location permission denied."));
}

// Fetch weather from API
async function fetchWeather(url) {
  try {
    DOM.errorMsg.hidden = true;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    updateDisplay(data);
  } catch (err) {
    showError(err.message);
  }
}

// Update UI with weather data
function updateDisplay(data) {
  const city = `${data.name}, ${data.sys?.country || ""}`;
  const tempC = data.main?.temp ?? null;
  const humidity = data.main?.humidity ?? null;
  const condition = data.weather?.[0]?.main || "Clear";
  const desc = data.weather?.[0]?.description || condition;

  appState.tempCelsius = tempC;
  appState.tzOffset = data.timezone ?? 0;

  DOM.display.classList.remove("hidden");
  DOM.locationName.textContent = city;
  DOM.humidity.textContent = humidity ?? "—";
  DOM.condition.textContent = capitalize(desc);
  DOM.icon.textContent = getWeatherIcon(condition);
  renderTemperature();
  startClock(appState.tzOffset);
  updateBackground(condition);
}

// Render temperature in selected unit
function renderTemperature() {
  if (appState.tempCelsius == null) return;
  const val = appState.isFahrenheit ? (appState.tempCelsius * 9/5 + 32) : appState.tempCelsius;
  DOM.tempVal.textContent = Math.round(val);
  DOM.tempUnit.textContent = appState.isFahrenheit ? "°F" : "°C";
}

// Weather icons mapping
function getWeatherIcon(condition) {
  const c = (condition || "").toLowerCase();
  if (c.includes("rain") || c.includes("drizzle")) return "🌧️";
  if (c.includes("cloud")) return "☁️";
  if (c.includes("snow")) return "❄️";
  if (c.includes("sun") || c.includes("clear")) return "☀️";
  if (c.includes("thunder")) return "⛈️";
  if (c.includes("mist") || c.includes("fog") || c.includes("haze")) return "🌫️";
  return "⛅";
}

// Update background based on weather
function updateBackground(condition) {
  const c = (condition || "").toLowerCase();
  let bgUrl = "";

  if (c.includes("rain") || c.includes("drizzle")) bgUrl = "assets/rainy.jpeg";
  else if (c.includes("cloud")) bgUrl = "assets/cloudy.jpeg";
  else if (c.includes("snow")) bgUrl = "assets/snow.jpeg";
  else if (c.includes("fog")) bgUrl = "assets/fog.jpeg";
  else if (c.includes("sun") || c.includes("clear")) bgUrl = "assets/sunny.jpg";
  else bgUrl = "assets/clear.jpeg";

  DOM.bgContainer.style.backgroundImage = `url('${bgUrl}')`;
}

// Start live clock for city time
function startClock(offsetSec) {
  if (appState.clockInterval) clearInterval(appState.clockInterval);
  const updateClock = () => {
    const utc = Date.now() + new Date().getTimezoneOffset()*60000;
    const cityTime = new Date(utc + offsetSec*1000);
    DOM.clock.textContent = `${String(cityTime.getHours()).padStart(2,'0')}:${String(cityTime.getMinutes()).padStart(2,'0')}`;
  };
  updateClock();
  appState.clockInterval = setInterval(updateClock, 60000);
}

// Show error messages
function showError(msg) {
  DOM.display.classList.remove("hidden");
  DOM.locationName.textContent = "—";
  DOM.tempVal.textContent = "—";
  DOM.humidity.textContent = "—";
  DOM.condition.textContent = "—";
  DOM.icon.textContent = "⚠️";
  DOM.errorMsg.hidden = false;
  DOM.errorMsg.textContent = msg;
}

// Capitalize first letter
function capitalize(str="") { return str.charAt(0).toUpperCase() + str.slice(1); }
