import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/es';
import { useParams } from 'react-router';
import { getForecastUrl } from '../utils/urls';
import { toCelsius } from '../utils/utils';

const useCityPage = () => {
  const { city, countryCode } = useParams();

  const [chartData, setChartData] = useState(null);
  const [forecastItemList, setForecastItemList] = useState(null);

  useEffect(() => {
    const getForecast = async () => {
      const url = getForecastUrl({ city, countryCode });

      try {
        const { data } = await axios.get(url);
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

export default useCityPage;
