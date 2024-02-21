import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "d36f779355b1fb6850ea4e1ab7126a32";

// https://api.openweathermap.org/data/2.5/weather?q=madurai&units=metric&appid=d36f779355b1fb6850ea4e1ab7126a32
// https://api.openweathermap.org/data/2.5/weather?lat=20.0063&lon=77.006&appid=d36f779355b1fb6850ea4e1ab7126a32

export const fetchWeatherCity = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: "metric",
      APPID: API_KEY,
    },
  });

  return data;
};

export const fetchWeatherGeo = async (lat, lon) => {
  const { data } = await axios.get(URL, {
    params: {
      lat: lat,
      lon: lon,
      units: "metric",
      APPID: API_KEY,
    },
  });

  return data;
};

// https://api.unsplash.com//photos/random?query=winter&orientation=landscape&client_id=XEX2vJqBV08uV7pramnVGQrj4RJPzxuspPoPru7y0bQ

export const fetchUnsplashImage = async (query) => {
  const API_KEY = `XEX2vJqBV08uV7pramnVGQrj4RJPzxuspPoPru7y0bQ`;

  const URL = `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${API_KEY}`;

  const { data } = await axios.get(URL);

  return data;
};
