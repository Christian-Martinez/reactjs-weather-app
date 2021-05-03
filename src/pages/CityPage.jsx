import { Grid } from '@material-ui/core';
import React from 'react';
import Weather from '../components/Weather';
import Forecast from '../components/Forecast';
import CityInfo from '../components/CityInfo';
import ForecastChart from '../components/ForecastChart';
import WeatherDetails from '../components/WeatherDetails';

const chartData = [
  {
    dayHour: 'Jue 18',
    min: 14,
    max: 22,
  },
  {
    dayHour: 'Vie 06',
    min: 18,
    max: 27,
  },
  {
    dayHour: 'Vie 12',
    min: 18,
    max: 28,
  },
  {
    dayHour: 'Vie 18',
    min: 18,
    max: 25,
  },
  {
    dayHour: 'Sab 06',
    min: 15,
    max: 22,
  },
  {
    dayHour: 'Sab 12',
    min: 12,
    max: 19,
  },
];

const CityPage = () => {
  const city = 'Buenos Aires';
  const country = 'Argentina';
  const state = 'clouds';
  const temperature = 20;
  const humidity = 80;
  const wind = 5;
  const forecastItemList = [
    { hour: 18, state: 'clear', temperature: 19, weekDay: 'Jueves' },
    { hour: 6, state: 'clouds', temperature: 18, weekDay: 'Viernes' },
    { hour: 12, state: 'drizzle', temperature: 17, weekDay: 'Viernes' },
    { hour: 18, state: 'clouds', temperature: 19, weekDay: 'Viernes' },
    { hour: 6, state: 'rain', temperature: 17, weekDay: 'Sábado' },
    { hour: 12, state: 'rain', temperature: 17, weekDay: 'Sábado' },
  ];

  return (
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
  );
};

export default CityPage;
