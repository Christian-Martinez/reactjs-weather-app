import React from 'react';
import PropTypes from 'prop-types';

import Weather from '../Weather/';
import CityInfo from '../CityInfo/';
import { Grid, List, ListItem } from '@material-ui/core';

const renderCityAndCountry = (eventOnClickCity) => (cityAndCountry) => {
  const { city, country } = cityAndCountry;

  return (
    <ListItem button key={city} onClick={eventOnClickCity}>
      <Grid container justify='center' alignItems='center'>
        <Grid item md={8} xs={12}>
          <CityInfo city={city} country={country} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Weather temperature={10} state='clouds' />
        </Grid>
      </Grid>
    </ListItem>
  );
};

const CityList = ({ cities, onClickCity }) => {
  return (
    <List>{cities.map((cityAndCountry) => renderCityAndCountry(onClickCity)(cityAndCountry))}</List>
  );
};

//como validar que cities tenga un array con la estructura que queremos
CityList.propTypes = {
  cities: PropTypes.array.isRequired,
  onClickCity: PropTypes.func.isRequired,
};

export default CityList;
