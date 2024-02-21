export const saveCity = (cityData) => {
  const temp = localStorage.getItem("cities")
    ? JSON.parse(localStorage.getItem("cities"))
    : [];

  const cityHistory = temp.filter((el) => el.city !== cityData.city);
  cityData["timestamp"] = Date.now();
  cityHistory.push(cityData);

  if (cityHistory.length >= 7) {
    cityHistory.shift();
  }
  localStorage.setItem("cities", JSON.stringify(cityHistory));
};

export const getCities = () => {
  const cities = localStorage.getItem("cities")
    ? JSON.parse(localStorage.getItem("cities"))
    : [];
  return cities;
};

export const getCity = () => {
  const cities = localStorage.getItem("cities")
    ? JSON.parse(localStorage.getItem("cities"))
    : [];
  return cities;
};

export const clearCities = (callback) => {
  localStorage.removeItem("cities");
  callback();
};
