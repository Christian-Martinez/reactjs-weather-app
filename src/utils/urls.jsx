const appid = 'f99bbd9e4959b513e9bd0d7f7356b38d';
// const appid = 'a0d7555681cc1ea2d83d09edf1b7795f';

export const getWeatherUrl = ({ city, countryCode }) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appid}`;

export const getForecastUrl = ({ city, countryCode }) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${appid}`;
