import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import { WeatherProvider } from "./contexts/WeatherContext";
import { UnsplashProvider } from "./contexts/UnsplashContext";
import { ThemeProvider } from "./contexts/ThemeContext";

ReactDOM.render(
  <WeatherProvider>
    <UnsplashProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </UnsplashProvider>
  </WeatherProvider>,
  document.getElementById("root")
);
