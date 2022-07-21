import axios from "axios";
import { useEffect, useState } from "react";
import SearchBox from "./components/SearchBox";
import WeatherView from "./components/WeatherView";
import { addDays, days, getImg, months, returnTime } from "./helpers";
import { returnWeatherData } from "./services";

function App() {
  const date = new Date();

  const month = months[date.getMonth()];
  const day = days[new Date().getDay() - 1];

  const [message, setMessage] = useState("locating your city...");
  const [findSelf, setFindSelf] = useState(false);

  const [weather, setWeather] = useState();
  const [forecast, setForecast] = useState();

  const [city, setCity] = useState("");

  const [notfound, setNotfound] = useState(true);

  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    axios.get("https://ipapi.co/json/").then((response) => {
      setCity(response.data.city);
    });
  }, []);

  useEffect(() => {
    if (city !== "") {
      returnWeatherData("city", { city: city })
        .then((res) => {
          setWeather({
            ...res.data.main,
            ...res.data.weather,
            country: res.data.sys.country,
          });
        })
        .catch((err) => {
          setNotfound(true);
          setMessage("City not found, Try again!");
          setCity("NOT FOUND!");
        });

      returnWeatherData("cityforcast", { city: city }).then((res) => {
        let args = returnTime(date.getHours(), 0, 0);
        setForecast(() => {
          let obj = [];
          for (let i = 1; i <= 5; i++) {
            obj = [
              ...obj,
              {
                temp: res.data.list[args.n * i].main.temp,
                code: res.data.list[args.n * i].weather[0].id,
              },
            ];
          }
          return obj;
        });
        setNotfound(false);
      });
    }

    // eslint-disable-next-line
  }, [city]);

  function changeCity(name) {
    setCity(name);
    setShowSearch(false);
  }

  return (
    <>
      {" "}
      {!notfound ? (
        <div className="w-screen h-screen flex flex-row items-center ml-[5vw]">
          {showSearch && (
            <SearchBox
              findCity={changeCity}
              close={() => {
                setShowSearch(false);
              }}
            />
          )}
          <div className="flex flex-col w-[60vw]">
            <h3 className="text-4xl mb-[2vh]">{day + " " + date.getDate()}</h3>{" "}
            <h3 className="text-4xl mb-[2vh]">
              {month.toUpperCase()} | {city}, {weather && weather.country}
            </h3>
            <div className="flex flex-row mb-[2vh]">
              <h1 className="text-[10vw]">
                {weather && Math.ceil(weather.temp)}°
              </h1>
              {weather && (
                <img
                  alt="weather icon"
                  className="w-[10vw] h-[10vw] ml-10 mt-10"
                  src={`/assets/${getImg(weather[(0)["id"]])}.png`}
                />
              )}
            </div>
            <div className="flex flex-row justify-evenly mt-[10vh]">
              {forecast &&
                forecast.map((data, index) => {
                  return (
                    <WeatherView
                      key={index}
                      day={days[addDays(index + 1).getDay()]}
                      icon={getImg([data.code])}
                      temp={data.temp + "°"}
                    />
                  );
                })}
            </div>
            <h2
              className="text-center mt-10 underline text-cyan-900 cursor-pointer"
              onClick={(e) => {
                //show search box
                setShowSearch(true);
              }}
            >
              find weather of a different region?
            </h2>
          </div>
          )
          <div className="flex flex-col w-[40vw] h-screen bg-blue-500">
            <img
              className="h-screen w-[40vw] object-cover"
              alt="city scenery"
              src={`https://source.unsplash.com/random/?${city},scenery`}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col col h-screen">
          <h1 className="text-2xl">{message}</h1>
          <button
            className="m-4 border-2 border-black p-4 rounded-lg"
            onClick={() => {
              setFindSelf(!findSelf);
            }}
          >
            Search?
          </button>
          {findSelf && (
            <SearchBox
              findCity={changeCity}
              close={() => {
                setFindSelf(false);
              }}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
