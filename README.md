
# Weather App 🌤️

A responsive **Weather App** that allows users to get live weather information for any city or their current location. This project was built as an internship task for Internee.pk.

---

## Features ✅

- Users can **enter a city name** to fetch weather details.
- Displays **temperature**, **humidity**, and **weather condition**.
- Shows an appropriate **weather icon**:
  - ☀️ Sunny
  - 🌧️ Rainy
  - ☁️ Cloudy
  - ❄️ Snowy
  - 🌫️ Mist/Fog
- **Error handling** for incorrect or unknown city names.
- **Toggle temperature unit** between Celsius (°C) and Fahrenheit (°F).
- **Dark / Light mode toggle** for better UI experience.
- **Dynamic background image** changes based on weather conditions.
- **Live clock** displays the local time of the searched city.
- **Mobile responsive** design for better experience on smaller screens.

---

## Concepts Learned 🔹

- Fetching data from **APIs** using `fetch()`.
- Handling **JSON responses** and updating the DOM dynamically.
- Using **Geolocation API** to detect user’s current location.
- DOM manipulation and event handling.
- Responsive UI design with CSS Flexbox/Grid.
- Conditional rendering based on data from the API.
- Applying dynamic **themes** and background images.

---

## Installation & Setup 💻

1. **Clone the repository**  
   - git clone <https://github.com/ayeshakanwal-rgb/weather-app.git>

2. Navigate to project folder
    - cd weather app

3. Open index.html in your browser

4. Get OpenWeatherMap API Key
     - Sign up at OpenWeatherMap
     - Replace the WEATHER_API_KEY variable in script.js with your API key.

     - const WEATHER_API_KEY = "YOUR_API_KEY_HERE";

## Usage 📝

1. Search by city:
   - Enter a city name and click Search.
   - Weather details will appear along with an icon and dynamic background.

2. Use current location:
  - Click Current Location to fetch weather for your device location.

3. Switch temperature units:
   - Use the °C/°F toggle in the header.

4. Toggle Dark/Light mode:
    - Use the Dark toggle in the header.

## Notes & Additional Challenge 💡
    - The background image changes dynamically based on weather keywords from the API response.
    - The app automatically updates the local time of the searched city.
    - Fully mobile responsive and adjusts layout for smaller screens.

## 💻 check live :
     https://ayeshakanwal-rgb.github.io/weather-app

## Author ✨
Ayesha Kanwal
Internship Project - Internee.pk 2025
>>>>>>> 2c1bba1 ( weather project)
