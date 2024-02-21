import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { saveCity } from "../utils/localStorage";

export const WeatherContext = createContext({
  weather: null,
  setWeather: () => null,
  loading: null,
  setLoading: () => null,
  query: null,
  setQuery: () => null,
  greetMsg: null,
  setGreetMsg: () => null,
  searchCity: () => null,
  msg: "Getting Geo Location",
  fetchWeatherCity: () => null,
  fetchWeatherGeo: () => null,
  units: null,
  changeUnits: () => null,
});

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [units, setUnits] = useState("metric");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [greetMsg, setGreetMsg] = useState("");
  let msg = "Getting Geo Location";
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "d36f779355b1fb6850ea4e1ab7126a32";

  const fetchWeatherCity = async (query) => {
    setLoading(true);

    const data = await axios
      .get(URL, {
        params: {
          q: query,
          units: "metric",
          APPID: API_KEY,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setLoading(false);
        return res.data;
      })
      .catch((err) => {
        setLoading(false);
        return {};
      });

    return data;
  };

  const fetchWeatherGeo = async (lat, lon) => {
    setLoading(true);

    const { data } = await axios.get(URL, {
      params: {
        lat: lat,
        lon: lon,
        units: "metric",
        APPID: API_KEY,
      },
    });
    setLoading(false);

    return data;
  };

  const searchCity = async (e) => {
    if (
      e.from === "history" &&
      Date.now() - e.data.timestamp < 1000 * 60 * 60
    ) {
      setGreetMsg("Showing Cached Data");
      setWeather(() => e.data);
      return null;
    }

    if (
      e.key === "Enter" ||
      e.from === "submit" ||
      (e.from === "history" &&
        Date.now() - e.data.timestamp > 1000 * 60 * 60) ||
      e.from === "voice"
    ) {
      const city =
        e.from === "history"
          ? e.data.city
          : e.from === "voice"
          ? e.city.replace(".", "")
          : query;
      setGreetMsg("Fetching Weather Data");
      const data = await fetchWeatherCity(city);

      if (data && Object.keys(data).length > 0) {
        let weatherData = {};
        weatherData["city"] = data.name;
        weatherData["country"] = data && data.sys && data.sys.country;
        weatherData["temp_c"] = Math.round(data.main.temp);
        weatherData["temp_f"] = Math.round(data.main.temp * 1.8 + 32);
        weatherData["temp_feels_c"] = Math.round(data.main.feels_like);
        weatherData["temp_feels_f"] = Math.round(
          data.main.feels_like * 1.8 + 32
        );
        weatherData["icon"] = data.weather[0].icon;
        weatherData["id"] = data.weather[0].id;
        weatherData["desc"] = data.weather[0].description;

        setWeather(weatherData);
        saveCity(weatherData);
        setGreetMsg("Hope it is correct 👍");
        setQuery("");
        // e.target.blur();
      } else {
        setGreetMsg("Sorry, We couldn't find your city 🥴");
        navigator.vibrate([500, 50, 300]);
        setQuery("");
      }
    }

    return null;
  };

  const changeUnits = (e) => {
    const selectedUnit = e.target.checked ? "metric" : "imperial";
    setUnits(() => selectedUnit);
    setGreetMsg(`Unit Changed to ${units !== "imperial" ? "°F" : "°C"}`);
  };

  useEffect(() => {
    const geoOptions = {
      timeout: 5000,
      enableHighAccuracy: true,
    };

    if (!navigator.geolocation) {
      setLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const { latitude, longitude } = position.coords;

          const data = await fetchWeatherGeo(latitude, longitude);
          let weatherData = {};
          weatherData["city"] = data.name;
          weatherData["country"] = data && data.sys && data.sys.country;
          weatherData["temp_c"] = Math.round(data.main.temp);
          weatherData["temp_f"] = Math.round(data.main.temp * 1.8 + 32);
          weatherData["temp_feels_c"] = Math.round(data.main.feels_like);
          weatherData["temp_feels_f"] = Math.round(
            data.main.feels_like * 1.8 + 32
          );
          weatherData["icon"] = data.weather[0].icon;
          weatherData["id"] = data.weather[0].id;
          weatherData["desc"] = data.weather[0].description;

          setWeather(weatherData);
          saveCity(weatherData);
        },
        () => {
          setLoading(false);
          setGreetMsg("Hope it is correct 👍");
          setQuery("");
        },
        geoOptions
      );
    }
  }, []);

  const value = {
    weather,
    setWeather,
    loading,
    setLoading,
    query,
    setQuery,
    greetMsg,
    setGreetMsg,
    searchCity,
    msg,
    fetchWeatherCity,
    fetchWeatherGeo,
    units,
    changeUnits,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
