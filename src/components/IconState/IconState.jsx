import React from 'react';
import PropTypes from 'prop-types';
import {
  WiDayCloudy,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiRaindrop,
  WiThunderstorm,
  WiDayFog,
} from 'react-icons/wi';

export const validValues = ['clouds', 'clear', 'rain', 'snow', 'drizzle', 'thunderstorm', 'mist'];

const stateByName = {
  clouds: WiDayCloudy,
  clear: WiDaySunny,
  rain: WiRain,
  snow: WiSnow,
  drizzle: WiRaindrop,
  thunderstorm: WiThunderstorm,
  mist: WiDayFog,
};

const IconState = ({ state }) => {
  const StateByName = stateByName[state];
  return <StateByName />;
};

IconState.propTypes = {
  state: PropTypes.oneOf(validValues).isRequired,
};

export default IconState;
