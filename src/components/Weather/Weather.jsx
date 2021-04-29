import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import {
  WiDayCloudy,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiRaindrop,
  WiThunderstorm,
} from 'react-icons/wi';
import { IconContext } from 'react-icons';

const stateByName = {
  clouds: WiDayCloudy,
  clear: WiDaySunny,
  rain: WiRain,
  snow: WiSnow,
  drizzle: WiRaindrop,
  thunderstorm: WiThunderstorm,
};

/* funcion que volvera a renderizzar el componente */
const renderState = (state) => {
  /* Componente dinamico empieza con mayuscula */
  const StateByName = stateByName[state];
  return <StateByName />;
};

const Weather = ({ temperature, state }) => {
  return (
    <div>
      <IconContext.Provider value={{ size: '5em' }}>{renderState(state)}</IconContext.Provider>
      <Typography display='inline' variant='h2'>
        {temperature}
      </Typography>
    </div>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired,
};

export default Weather;
