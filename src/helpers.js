export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export const getImg = (code) => {
  if (code > 299) return "lightning";
  else if (code > 599) return "rain";
  else if (code > 699) return "hail";
  else if (code > 799) return "cloudy";
  else return "sun";
};

export function returnTime(time, i, recur) {
  recur++;
  i = i + 3;
  if (time < i) {
    return { time: i, n: recur };
  } else return returnTime(time, i, recur);
}

export function addDays(days) {
  var result = new Date();
  result.setDate(result.getDate() + days - 1);

  return result;
}
