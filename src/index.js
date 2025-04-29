import './style.css';

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
  const forecastArray = await getForecast(location);
  return forecastArray;
}

processForecast('cracow').then((data) => {
  console.log(data);
});
