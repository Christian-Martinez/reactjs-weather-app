import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import {
  WiDayCloudy,
  WiDaySunny,
  WiRain,
  WiSnow,
  WiRaindrop,
  WiThunderstorm,
} from 'react-icons/wi';
import { IconContext } from 'react-icons';

const validValues = ['clouds', 'clear', 'rain', 'snow', 'drizzle', 'thunderstorm'];

const stateByName = {
  clouds: WiDayCloudy,
  clear: WiDaySunny,
  rain: WiRain,
  snow: WiSnow,
  drizzle: WiRaindrop,
  thunderstorm: WiThunderstorm,
};

const renderState = (state) => {
  const StateByName = stateByName[state];
  return <StateByName />;
};

const ForecastItem = ({ weekDay, hour, state, temperature }) => {
  //const iconContextSize = useMemo(() => ({ size:'5em'}), [])
  return (
    <Grid container direction='column' justify='center' alignItems='center'>
      <Grid item>
        <Typography>{weekDay}</Typography>
      </Grid>
      <Grid item>
        <Typography>{hour}</Typography>
      </Grid>
      <Grid item>
        <IconContext.Provider value={{ size: '5em' }}>{renderState(state)}</IconContext.Provider>
      </Grid>
      <Grid item>
        <Typography>{temperature} °</Typography>
      </Grid>
    </Grid>
  );
};

ForecastItem.propTypes = {
  weekDay: PropTypes.string.isRequired,
  hour: PropTypes.number.isRequired,
  state: PropTypes.oneOf(validValues).isRequired,
  temperature: PropTypes.number.isRequired,
};

export default ForecastItem;
