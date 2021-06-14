import { useEffect, useState } from 'react';
import axios from 'axios';

import { getWeatherUrl } from '../utils/urls';
import { getCityCode, toCelsius } from './../utils/utils';

const useCityList = (cities) => {
  const [allWeather, setAllWeather] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const setWeather = (city, countryCode) => {
      const url = getWeatherUrl({ city, countryCode });

      axios
        .get(url)
        .then((response) => {
          const { data } = response;
          const temperature = toCelsius(data.main.temp);
          const state = data.weather[0].main.toLowerCase();
          // console.log(city, temperature, state);
          const propName = getCityCode(city, countryCode);
          const propValue = { temperature, state }; // Ej: { temperature: 10, state: "sunny" }
          // setAllWeather({ ...allWeather, [propName]: propValue });
          /* functional update - para asegurar que estamos tomando el valor anterior */
          /* set[VAR_ESTADO](VAR_ESTADO => VAR_ESTADO+1) */
          setAllWeather((allWeather) => ({ ...allWeather, [propName]: propValue }));
        })
        .catch((error) => {
          if (error.response) {
            // Errores que nos responde el server
            const { data, status } = error.response;
            console.log('error', data, status);
            setError('Ha ocurrido un error en el servidor del clima');
          } else if (error.request) {
            // Errores que suceden por no llegar al server
            setError('Verifique la conexión a internet');
          } else {
            // Errores imprevistos
            setError('Error al cargar los datos');
          }
        });
    };

    cities.forEach(({ city, countryCode }) => {
      // if (!allWeather[getCityCode(city, countryCode)]) {  // {}
      setWeather(city, countryCode);
      // }
    });
  }, [cities]);

  return { allWeather, error, setError };
};

export default useCityList;
