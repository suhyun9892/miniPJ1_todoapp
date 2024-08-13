const API_KEY = "2adc56b466647529ed2d583a496656e9";

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

function toggleLoadingSpinner(city, isShow) {
  document.querySelector(`#${city.id}`).style.display = isShow
    ? "none"
    : "block";
  document.querySelector(`.loading.${city.id}`).style.display = isShow
    ? "block"
    : "none";
}

async function fetchWeather(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.q}&appid=${API_KEY}&units=metric`
  );
  const data = await res.json();
  const weather = document.querySelector(`#${city.id} h3:first-child`);
  weather.innerText = `${data.name} ${city.flag} 
    ${data.weather[0].main} / ${data.main.temp} ℃ `;
}

function onGeoOk() {
  const cities = [
    { id: "geneve", flag: "🇨🇭", q: "Genève" },
    { id: "seoul", flag: "🇰🇷", q: "Seoul" },
  ];
  cities.forEach(async (city) => {
    toggleLoadingSpinner(city, true);
    await fetchWeather(city);
    toggleLoadingSpinner(city, false);
  });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}
