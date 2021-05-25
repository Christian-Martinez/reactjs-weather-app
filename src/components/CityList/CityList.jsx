import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import convertUnits from 'convert-units';
import { Grid, List, ListItem } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import Weather from '../Weather';
import CityInfo from '../CityInfo';

const getCityCode = (city, countryCode) => `${city}-${countryCode}`;

const renderCityAndCountry = (eventOnClickCity) => (cityAndCountry, weather) => {
  const { city, country, countryCode } = cityAndCountry;

  return (
    <ListItem
      button
      key={getCityCode(city, countryCode)}
      onClick={() => eventOnClickCity(city, countryCode)}
    >
      <Grid container justify='center' alignItems='center'>
        <Grid item md={8} xs={12}>
          <CityInfo city={city} country={country} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Weather temperature={weather && weather.temperature} state={weather && weather.state} />
        </Grid>
      </Grid>
    </ListItem>
  );
};

const CityList = ({ cities, onClickCity }) => {
  const [allWeather, setAllWeather] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const setWeather = (city, countryCode) => {
      const appid = 'f99bbd9e4959b513e9bd0d7f7356b38d';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appid}`;
      axios
        .get(url)
        .then((response) => {
          const { data } = response;
          const temperature = Number(convertUnits(data.main.temp).from('K').to('C').toFixed(0));
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

  return (
    <>
      {error && (
        <Alert onClose={() => setError(null)} severity='error'>
          {error}
        </Alert>
      )}
      <List>
        {cities.map((cityAndCountry) =>
          renderCityAndCountry(onClickCity)(
            cityAndCountry,
            allWeather[getCityCode(cityAndCountry.city, cityAndCountry.countryCode)]
          )
        )}
      </List>
    </>
  );
};

CityList.propTypes = {
  cities: PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      countryCode: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickCity: PropTypes.func.isRequired,
};

export default CityList;
