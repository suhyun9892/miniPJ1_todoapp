const API_KEY = "2adc56b466647529ed2d583a496656e9";

function showLoadingSpinner() {
  document.getElementById("geneve").style.display = "none";
  document.getElementById("seoul").style.display = "none";
  document.getElementById("loadingSpinner").style.display = "block";
  document.getElementById("loadingSpinner2").style.display = "block";
}

function hideLoadingSpinner() {
  document.getElementById("geneve").style.display = "block";
  document.getElementById("seoul").style.display = "block";
  document.getElementById("loadingSpinner").style.display = "none";
  document.getElementById("loadingSpinner2").style.display = "none";
}

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=Genève&appid=${API_KEY}&units=metric`;
  const url2 = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric`;

  showLoadingSpinner();
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather #geneve h3:first-child");
      const city = document.querySelector("#weather #geneve h3:last-child");
      weather.innerText = `${data.name} 🇨🇭 
      ${data.weather[0].main} / ${data.main.temp} ℃ `;
    })
    .finally(() => {
      hideLoadingSpinner();
    });

  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      const weather2 = document.querySelector("#weather #seoul h3:first-child");
      const city2 = document.querySelector("#weather #seoul h3:last-child");
      weather2.innerText = `${data.name} 🇰🇷 
      ${data.weather[0].main} / ${data.main.temp} ℃ `;
    })
    .finally(() => {
      hideLoadingSpinner();
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}
document.addEventListener("DOMContentLoaded", function () {
  showLoadingSpinner();
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
});
