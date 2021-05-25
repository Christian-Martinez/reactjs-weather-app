import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router';

import Weather from '../components/Weather';
import Forecast from '../components/Forecast';
import CityInfo from '../components/CityInfo';
import AppFrame from '../components/AppFrame/AppFrame';
import ForecastChart from '../components/ForecastChart';
import WeatherDetails from '../components/WeatherDetails';

const CityPage = () => {
  const { city, countryCode } = useParams();

  const [chartData, setChartData] = useState(null);
  const [forecastItemList, setForecastItemList] = useState(null);

  const country = 'Argentina';
  const state = 'clouds';
  const temperature = 20;
  const humidity = 80;
  const wind = 5;
  const forecastItemListE = [
    { hour: 18, state: 'clear', temperature: 19, weekDay: 'Jueves' },
    { hour: 6, state: 'clouds', temperature: 18, weekDay: 'Viernes' },
    { hour: 12, state: 'drizzle', temperature: 17, weekDay: 'Viernes' },
    { hour: 18, state: 'clouds', temperature: 19, weekDay: 'Viernes' },
    { hour: 6, state: 'rain', temperature: 17, weekDay: 'Sábado' },
    { hour: 12, state: 'rain', temperature: 17, weekDay: 'Sábado' },
  ];

  useEffect(() => {
    const getForecast = async () => {
      const appid = 'f99bbd9e4959b513e9bd0d7f7356b38d';
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${appid}`;
      try {
        const resp = await axios.get(url);
        console.log(resp);
        const daysAhead = [0, 1, 2, 3, 4, 5];
        const days = daysAhead.map((d) => moment().add(d, 'd'));
        const dataAux = days.map((day) => {
          // dayHour, min, max
          return {
            dayHour: day.format('ddd'),
            min: 10,
            max: 30,
            // hasTemps: temps.length > 0 ? true : false,
          };
        });
        setChartData(dataAux);
        setForecastItemList(forecastItemListE);
      } catch (error) {
        console.log(error);
      }
    };
    getForecast();
  }, [city, countryCode]);

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
