import './style.css';

const input = document.querySelector('#location');
const submitBtn = document.querySelector('#submitBtn');
const errorMsg = document.querySelector('#errorMsg');
const content = document.querySelector('#forecast');

// eslint-disable-next-line consistent-return
async function getForecast(location) {
  try {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=BC6528TYCKWQREPG7JR8BLLCW&contentType=json`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function processForecast(location) {
  const forecast = await getForecast(location);

  if (!forecast || !forecast.days) {
    return [];
  }
  const forecastArray = forecast.days.slice(0, 7);
  return forecastArray;
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  errorMsg.textContent = '';
  content.innerHTML = '';
  const location = input.value.trim();
  if (!location) {
    errorMsg.textContent = 'Please enter a location.';
    return;
  }

  processForecast(location).then((data) => {
    if (!data.length) {
      errorMsg.textContent = 'Invalid location or no forecast available.';
    } else {
      data.forEach((day) => {
        const div = document.createElement('div');
        div.classList.add('day');

        const condition = document.createElement('p');
        condition.classList.add('condition');
        condition.textContent = day.conditions;

        const date = document.createElement('p');
        date.classList.add('date');
        date.textContent = day.datetime;

        const temp = document.createElement('p');
        temp.classList.add('temp');
        temp.textContent = `${day.temp}°F`;

        div.appendChild(temp);
        div.appendChild(condition);
        div.appendChild(date);
        content.appendChild(div);
      });
    }
  });
});
