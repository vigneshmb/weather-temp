import React, { useEffect, useState } from "react";
import {
  fetchWeatherCity,
  fetchUnsplashImage,
} from "../api/fetchWeatherUnsplash";

export default function WelcomeBanner(props) {
  const [query, setQuery] = useState("");
  const [greetMsg, setGreetMsg] = useState("Enter Your location....");
  const [weather, setWeather] = useState(null);

  const search = async (e) => {
    if (e.key === "Enter") {
      setGreetMsg("Fetching Weather Data");
      const data = await fetchWeatherCity(query);

      setWeather(data);
      setGreetMsg("Hope it is correct");
      setQuery("");
      e.target.blur();
    }
  };

  const [imageURL, setImageURL] = useState(
    "https://images.unsplash.com/photo-1510932130600-407ed1d1b61b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTc3MjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjIxMzQ0NjI&ixlib=rb-1.2.1&q=80&w=1080"
  );
  // const [wtrType, setWtrType] = useState("Rain");

  const weatherData = weather ? weather : props.data;

  useEffect(() => {
    weatherData?.weather &&
      console.log(`${weatherData.name} ${weatherData.weather[0].main}`);

    async function fetchImage() {
      // const imageData = {
      //   urls: {
      //     regular:
      //       "https://www.bing.com/th?id=OHR.MidsummerEve_EN-IN5378541716_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
      //   },
      // };

      const imageQuery = weatherData && `${weatherData.name}`;

      const imageData = await fetchUnsplashImage(imageQuery);

      // weatherData?.weather && `${weatherData.weather[0].description}`
      // `${weatherData.name} ${weatherData.weather[0].description}`;

      // console.log(imageData && imageData.urls && imageData.urls.regular);

      // const cssHash = {
      //   Rain: {
      //     bgColor: "bg-cyan-400",
      //     cardColor: "bg-cyan-800",
      //     textColor: "bg-slate-800",
      //     icon: `${weatherData.weather[0].icon}`,
      //   },
      // };

      setImageURL(imageData?.urls?.regular);
    }
    weatherData?.weather && fetchImage();
  }, [weatherData]);

  // console.log(weather);

  return (
    // <div>
    //   <div className="relative overflow-hidden text-white group rounded-2xl flex items-center justify-center mt-16">
    //     <img
    //       className="absolute inset-0 object-cover w-full h-full opacity-40"
    //       src={imageURL}
    //       alt="unsplash api is used here,but failed"
    //     />
    //     <div className="relative p-4">
    //       {/* city name with country */}
    //       <p className="uppercase text-white align-baseline flex items-center justify-center text-center">
    //         <img
    //           className="w-20 h-20 align-top justify-left"
    //           src={`https://openweathermap.org/img/wn/${
    //             weatherData &&
    //             weatherData.weather &&
    //             weatherData.weather[0].icon
    //           }@2x.png`}
    //           alt={weatherData && weatherData.weather[0].description}
    //         />
    //         <span className="m-1 p-1 text-2xl align-baseline tracking-widest font-medium">
    //           {weatherData ? weatherData.name : ""}
    //         </span>
    //         <sup className=" py-0.5 px-1.5 rounded-lg text-sm text-white bg-emerald-900 font-xs uppercase align-top">
    //           {weatherData ? weatherData.sys.country : ""}
    //         </sup>
    //       </p>

    //       {/* city temperature */}
    //       <div className="m-6 p-8 flex items-center justify-center proportional-nums rounded-xl">
    //         <h1 className="text-9xl font-bold tracking-wide align-bottom">
    //           {Math.round(weatherData && weatherData.main.temp)}
    //           <sup className="text-2xl  align-top">°C</sup>
    //         </h1>
    //       </div>

    //       {/* temperature feels like & description */}
    //       <div className=" flex items-center justify-center m-4 p-4">
    //         <p className="capitalize font- tracking-wide">
    //           feels like{" "}
    //           {Math.round(weatherData && weatherData.main.feels_like)} with {weatherData && weatherData.weather[0].description}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    //   {/* city search box & unit selection */}
    //   <div className="mt-4 flex items-center justify-center text-black">
    //     <input
    //       type="text"
    //       className="rounded-lg w-full h-10 text-center border-2"
    //       placeholder={greetMsg}
    //       value={query}
    //       onChange={(e) => setQuery(e.target.value)}
    //       onKeyPress={search}
    //     />

    //     {/* <label class="relative w-16 h-8 cursor-pointer">
    //         <input type="checkbox" class="sr-only peer" />

    //         <span class="absolute inset-0 bg-blue-400 rounded-full transition peer-checked:bg-blue-600">C</span>

    //         <span class="absolute inset-0 w-6 h-6 m-1 bg-white rounded-full transition peer-checked:translate-x-8">F</span>
    //       </label> */}
    //   </div>
    // </div>
    <div className="bg-slate-800 font-mono text-white p-4 m-2 justify-items-center">
      <h1 className="text-bold text-3xl">Welcome to Whether</h1>
      <p className="text-light text-sm">
        We are trying access your device's location to show the appropriate
        Weather. Please allow the prompt
      </p>
    </div>
  );
}
