import axios from "axios";
import { configs } from "../configs";

const requests = axios.create({ baseURL: configs.URL });

export const returnWeatherData = (type, data) => {
  if (type === "city") {
    return requests.get(
      "weather?q=" + data.city + configs.API + "&units=metric"
    );
  } else if (type === "cityforcast") {
    return requests.get(
      "forecast?q=" + data.city + configs.API + "&units=metric"
    );
  }
};
