import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import convertUnits from 'convert-units';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router';

import Weather from '../components/Weather';
import Forecast from '../components/Forecast';
import CityInfo from '../components/CityInfo';
import AppFrame from '../components/AppFrame/AppFrame';
import ForecastChart from '../components/ForecastChart';
import WeatherDetails from '../components/WeatherDetails';

const useCityPage = () => {
  const { city, countryCode } = useParams();

  const [chartData, setChartData] = useState(null);
  const [forecastItemList, setForecastItemList] = useState(null);

  useEffect(() => {
    const getForecast = async () => {
      const appid = 'f99bbd9e4959b513e9bd0d7f7356b38d';
      // const appid = 'a0d7555681cc1ea2d83d09edf1b7795f';
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${appid}`;
      try {
        const { data } = await axios.get(url);
        const toCelsius = (temp) => Number(convertUnits(temp).from('K').to('C').toFixed(0));
        console.log('data', data);
        const daysAhead = [0, 1, 2, 3, 4, 5];
        const days = daysAhead.map((d) => moment().add(d, 'd'));
        const dataAux = days
          .map((day) => {
            // debugger;
            const tempObjArray = data.list.filter((item) => {
              const dayOfYear = moment.unix(item.dt).dayOfYear();
              return dayOfYear === day.dayOfYear();
            });
            // console.log('day.dayOfYear()', day.dayOfYear());
            // console.log('tempObjArray', tempObjArray);

            const temps = tempObjArray.map((item) => item.main.temp);

            // dayHour, min, max
            return {
              dayHour: day.format('ddd'),
              //Math.min(60,20,50)
              min: toCelsius(Math.min(...temps)),
              max: toCelsius(Math.max(...temps)),
              hasTemps: temps.length > 0,
            };
          })
          .filter((item) => item.hasTemps);

        setChartData(dataAux);

        /* obtener { hour: 18, state:"clouds", temperature:17, weekDay:"Jueves" } */
        const interval = [4, 8, 12, 16, 20, 24];
        const forecastItemListAux = data.list
          .filter((item, index) => interval.includes(index))
          .map((item) => {
            return {
              hour: moment.unix(item.dt).hour(),
              weekDay: moment.unix(item.dt).format('dddd'),
              state: item.weather[0].main.toLowerCase(),
              temperature: toCelsius(item.main.temp),
            };
          });
        // debugger;
        setForecastItemList(forecastItemListAux);
      } catch (error) {
        console.log(error);
      }
    };
    getForecast();
  }, [city, countryCode]);
  return { city, chartData, forecastItemList };
};

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
