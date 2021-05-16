import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Weather from '../Weather/';
import CityInfo from '../CityInfo/';
import { Grid, List, ListItem } from '@material-ui/core';

const renderCityAndCountry = (eventOnClickCity) => (cityAndCountry, weather) => {
  const { city, country } = cityAndCountry;

  return (
    <ListItem button key={city} onClick={eventOnClickCity}>
      <Grid container justify='center' alignItems='center'>
        <Grid item md={8} xs={12}>
          <CityInfo city={city} country={country} />
        </Grid>
        <Grid item md={4} xs={12}>
          {weather ? (
            <Weather temperature={weather.temperature} state={weather.state} />
          ) : (
            'no hay datos'
          )}
        </Grid>
      </Grid>
    </ListItem>
  );
};

const CityList = ({ cities, onClickCity }) => {
  const [allWeather, setAllWeather] = useState({});

  useEffect(() => {
    const setWeather = (city, country, countryCode) => {
      const appid = 'f99bbd9e4959b513e9bd0d7f7356b38d';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appid}`;
      axios.get(url).then((response) => {
        const { data } = response;
        const temperature = data.main.temp;
        const state = data.weather[0].main.toLowerCase();
        console.log(city, temperature, state);

        const propName = `${city}-${country}`;
        const propValue = { temperature, state }; // Ej: { temperature: 10, state: "sunny" }
        // setAllWeather({ ...allWeather, [propName]: propValue });
        /* functional update - para asegurar que estamos tomando el valor anterior */
        /* set[VAR_ESTADO](VAR_ESTADO => VAR_ESTADO+1) */
        setAllWeather((allWeather) => ({ ...allWeather, [propName]: propValue }));
      });
    };

    cities.forEach(({ city, country, countryCode }) => {
      // if (!allWeather[getCityCode(city, countryCode)]) {  // {}
      setWeather(city, country, countryCode);
      // }
    });
  }, [cities]);

  return (
    <List>
      {cities.map((cityAndCountry) =>
        renderCityAndCountry(onClickCity)(
          cityAndCountry,
          allWeather[`${cityAndCountry.city}-${cityAndCountry.country}`]
        )
      )}
    </List>
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
