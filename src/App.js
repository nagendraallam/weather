import axios from "axios";
import "./css/App.css";
import { useEffect, useState } from "react";
import sun from "./icons/sun.png";

function App() {
  const [data, setData] = useState({});
  const [aqiData, setAqi] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_APIKEY}&units=metric`
        )
        .then((res) => {
          console.log(res.data);
          setData({
            ...data,
            description: res.data.weather[0].description,
            weather: res.data.weather[0].main,
            temperature: res.data.main.temp,
            city: res.data.name,
            country: res.data.sys.country,
            icon: res.data.weather[0].icon,
            id: String(res.data.weather[0].id),
            color: returnColor(String(res.data.weather[0].id)),
          });
        });
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_APIKEY}`
        )
        .then((res) => {
          console.log(res.data.list[0].components);
          setAqi({
            polution: res.data.list[0].main.aqi,
            components: res.data.list[0].components,
          });
        });
    });
  }, []);

  function returnColor(id) {
    if (id.startsWith("2") || id.startsWith("3") || id.startsWith("5")) {
      return "#8CA1A5";
    } else if (id.startsWith("6")) {
      return "#B5DEFF";
    } else if (id.startsWith("7")) { 
      return "#F7D59C";
    } else if (id.startsWith("8")) {
      return "#B5DEFF";
    }

    return "black";
  }

  return (
    <div className="App" style={{ backgroundColor: data.color }}>
      <h1>
        {data.city ? data.city + ", " + data.country : "Finding location"}
      </h1>
      <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} />
      <h2>
        {data.temperature
          ? data.temperature + "°C"
          : " Getting temperature"}
      </h2>
      <h2>{data.weather ? data.description : ""}</h2>
      {/* <h2>
        {aqiData.polution ? aqiData.polution : "getting pollution status"}
      </h2>
      <ul>
        {aqiData.components
          ? Object.keys(aqiData.components).map((key, value) => {
              return (
                <li key={key}>
                  {key} : {aqiData.components[key]}
                </li>
              );
            })
          : "Getting components"}
      </ul> */}
    </div>
  );
}

export default App;
