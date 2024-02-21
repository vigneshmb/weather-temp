import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

import { WeatherContext } from "./WeatherContext";

export const UnsplashContext = createContext({
  imageURL: null,
});

export const UnsplashProvider = ({ children }) => {
  const [imageURL, setImageURL] = useState(
    "https://www.bing.com/th?id=OHR.MidsummerEve_EN-IN5378541716_1920x1080.jpg&rf=LaDigue_1920x1080.jpg"
  );

  const { weather } = useContext(WeatherContext);

  const fetchUnsplashImage = async (query) => {
    const API_KEY = `XEX2vJqBV08uV7pramnVGQrj4RJPzxuspPoPru7y0bQ`;

    const URL = `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${API_KEY}`;

    const { data } = await axios.get(URL);

    return data;
  };

  useEffect(() => {
    async function fetchImage() {
      if (process.env.NODE_ENV === "production") {
        const imageQuery = weather && `${weather.city}`;
        const imageData = await fetchUnsplashImage(imageQuery);
        setImageURL(imageData?.urls?.regular);
      } else {
        const imageData = {
          urls: {
            regular:
              "https://www.bing.com/th?id=OHR.MidsummerEve_EN-IN5378541716_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
          },
        };
        setImageURL(imageData?.urls?.regular);
      }
    }
    weather?.weather && fetchImage();
  }, [weather]);

  const value = {
    imageURL,
  };

  return (
    <UnsplashContext.Provider value={value}>
      {children}
    </UnsplashContext.Provider>
  );
};
