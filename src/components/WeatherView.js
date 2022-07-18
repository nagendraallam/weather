import React from "react";

export default function WeatherView(props) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>{props.day}</h1>
      <img className="w-[3vw]" src={`/assets/${props.icon}.png`} alt='weather icon' />
      <h1>{props.temp}</h1>
    </div>
  );
}
