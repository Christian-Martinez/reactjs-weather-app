import React from 'react';
import PropTypes from 'prop-types';

import Weather from '../Weather/';
import CityInfo from '../CityInfo/';
import { Grid } from '@material-ui/core';

const renderCityAndCountry = (cityAndCountry) => {
  const { city, country } = cityAndCountry;

  return (
    <li key={city}>
      <Grid container justify='center' alignItems='center'>
        <Grid item md={9} xs={12}>
          <CityInfo city={city} country={country} />
        </Grid>
        <Grid item md={3} xs={12}>
          <Weather temperature={10} state='clouds' />
        </Grid>
      </Grid>
    </li>
  );
};

const CityList = ({ cities }) => {
  return <ul>{cities.map((cityAndCountry) => renderCityAndCountry(cityAndCountry))}</ul>;
};

CityList.propTypes = {};

export default CityList;
