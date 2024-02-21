import axios from "axios";

// https://api.unsplash.com//photos/random?query=winter&orientation=landscape&client_id=XEX2vJqBV08uV7pramnVGQrj4RJPzxuspPoPru7y0bQ

export const fetchUnsplashImage = async (query) => {
  const API_KEY = `XEX2vJqBV08uV7pramnVGQrj4RJPzxuspPoPru7y0bQ`;

  const URL = `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${API_KEY}`;

  const { data } = await axios.get(URL);
  // {
  // params: {
  //   q: query,
  //   units: "metric",
  //   APPID: API_KEY,
  // },
  //   });

  return data;
};
