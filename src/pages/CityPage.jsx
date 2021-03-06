import React from 'react';
import { Grid } from '@material-ui/core';

import Weather from '../components/Weather';
import Forecast from '../components/Forecast';
import CityInfo from '../components/CityInfo';
import AppFrame from '../components/AppFrame/AppFrame';
import ForecastChart from '../components/ForecastChart';
import WeatherDetails from '../components/WeatherDetails';
import useCityPage from '../hooks/useCityPage';

const CityPage = () => {
  const { city, chartData, forecastItemList } = useCityPage();

  const country = 'Argentina';
  const state = 'clouds';
  const temperature = 20;
  const humidity = 80;
  const wind = 5;

  return (
    <AppFrame>
      <Grid container justify='space-around' direction='column' spacing={2}>
        <Grid item container xs={12} justify='center' alignItems='flex-end'>
          <CityInfo city={city} country={country} />
        </Grid>
        <Grid container item xs={12} justify='center'>
          <Weather state={state} temperature={temperature} />
          {humidity && wind && <WeatherDetails humidity={humidity} wind={wind} />}
        </Grid>
        <Grid item>{chartData && <ForecastChart data={chartData} />}</Grid>
        <Grid item>{forecastItemList && <Forecast forecastItemList={forecastItemList} />}</Grid>
      </Grid>
    </AppFrame>
  );
};

export default CityPage;
