import React, { createContext, useEffect, useContext } from "react";
import { useMemo } from "react";

import { WeatherContext } from "./WeatherContext";

export const ThemeContext = createContext({
  userPrefer: "",
  theme: null,
  temp: null,
});

export const ThemeProvider = ({ children }) => {
  const { weather } = useContext(WeatherContext);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      // userPrefer="dark";
    } else {
      document.documentElement.classList.remove("dark");
      // userPrefer="light";
    }
  }, []);

  const theme = useMemo(() => {
    const cssHash = [
      {
        // for clear sky & others -> (temp === 800)
        bgColor: "bg-amber-100",
        cardColor: "bg-amber-500",
        textColor: "text-white-800",
        buttonColor: "bg-amber-300",
        buttonTextColor: "text-slate-700",
      },
      {
        // for rain, thunderstorm, drizzle, snow -> (temp >= 200 && temp < 700)
        bgColor: "bg-cyan-500",
        cardColor: "bg-cyan-100",
        textColor: "text-slate-800",
        buttonColor: "bg-cyan-300",
        buttonTextColor: "text-slate-700",
      },
      {
        // for clouds, atmosphere -> (temp >= 700 && temp < 900 && temp !== 800)
        bgColor: "bg-teal-400",
        cardColor: "bg-teal-100",
        textColor: "text-slate-800",
        buttonColor: "bg-teal-300",
        buttonTextColor: "text-slate-700",
      },
    ];

    const temp = weather ? weather.id : 800;

    if (temp === 800) {
      return cssHash[0];
    } else if (temp >= 200 && temp < 700) {
      return cssHash[1];
    } else if (temp >= 700 && temp < 900 && temp !== 800) {
      return cssHash[2];
    } else {
      return {
        bgColor: "bg-indigo-900/80",
        cardColor: "bg-fuchsia-700",
        textColor: "text-indigo-50",
      };
    }
  }, [weather]);

  const value = {
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
