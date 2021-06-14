import React from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import CityList from './../components/CityList';
import AppFrame from '../components/AppFrame/AppFrame';

const cities = [
  { city: 'Buenos Aires', country: 'Argentina', countryCode: 'AR' },
  { city: 'Bogotá', country: 'Colombia', countryCode: 'CO' },
  { city: 'La Paz', country: 'Bolivia', countryCode: 'BO' },
  { city: 'Madrid', country: 'España', countryCode: 'ES' },
];

const MainPage = () => {
  const history = useHistory();

  const onClickHandler = (city, countryCode) => {
    console.log(city, countryCode);
    history.push(`/city/${countryCode}/${city}`);
  };

  return (
    <AppFrame>
      <Paper elevation={3}>
        <CityList cities={cities} onClickCity={onClickHandler} />
      </Paper>
    </AppFrame>
  );
};

export default MainPage;
