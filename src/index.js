import './style.css';

const input = document.querySelector('#location');
const submitBtn = document.querySelector('#submitBtn');

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
  const location = input.value.trim();
  if (!location) {
  }

  processForecast(location).then((data) => {
    console.log(data);
  });
});
