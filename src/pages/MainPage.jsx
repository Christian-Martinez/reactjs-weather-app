import React from 'react';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import CityList from './../components/CityList';

const cities = [
  { city: 'Buenos Aires', country: 'Argentina' },
  { city: 'Bogotá', country: 'Colombia' },
  { city: 'Madrid', country: 'España' },
  { city: 'Ciudad de México', country: 'México' },
];

const MainPage = () => {
  const history = useHistory();

  const onClickHandler = (city, countryCode) => {
    history.push(`/city`);
  };

  return (
    <Paper elevation={3}>
      <CityList cities={cities} onClickCity={onClickHandler} />
    </Paper>
  );
};

export default MainPage;
