import React,{useContext} from "react";
import { CirclesWithBar } from "react-loader-spinner";
import { WeatherContext } from "../contexts/WeatherContext";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Loader(props) {

  const {
    greetMsg,
  } = useContext(WeatherContext);

  const { theme } = useContext(ThemeContext);

  return (
    <div className="grid grid-cols-1 grid-rows-2 justify-items-center place-content-center ">
          <div>
            <h1 className={`${theme ? theme.textColor : "bg-slate-800"}`}>
              {greetMsg}
            </h1>
          </div>
          <div>
          <CirclesWithBar
      height={props?.height || 100 }
      width={props?.width || 100 }
      color="#ffffff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      outerCircleColor=""
      innerCircleColor=""
      barColor=""
      ariaLabel="circles-with-bar-loading"/>
          </div>
        </div>
  );
}
