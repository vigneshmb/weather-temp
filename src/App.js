import React, { useContext } from "react";

import { WeatherContext } from "./contexts/WeatherContext";
// import { UnsplashContext } from "./contexts/UnsplashContext";
import { ThemeContext } from "./contexts/ThemeContext";
import WeatherCardGeo from "./components/WeatherCardGeo";
import Loader from "./components/Loader";

function App() {
  const { loading, msg } = useContext(WeatherContext);
  // const { imageURL } = useContext(UnsplashContext);
  const { theme } = useContext(ThemeContext);

  // console.log(imageURL);
  // console.log(theme);

  return (
    <div
      className={`${
        theme ? theme.bgColor : "bg-slate-800"
      } w-screen h-screen font-poppins`}
    >
      <div className="grid lg:grid-cols-3 p-2 lg:mx-auto sm:grids-cols-1 justify-items-center place-content-center w-full h-full">
        <div className="lg:col-start-2 lg:col-span-1 sm:col-span-1 sm:p-4 sm:mx-4 w-full h-full">
          {loading == null || loading === true ? (
            <div className="grid grid-cols-1 grid-rows-2 justify-items-center place-content-center w-full h-full">
              <div>
                <h1 className={`${theme ? theme.textColor : "bg-slate-800"}`}>
                  {msg}
                </h1>
              </div>
              <div>
                <Loader height="120" width="120" />
              </div>
            </div>
          ) : (
            <WeatherCardGeo />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
