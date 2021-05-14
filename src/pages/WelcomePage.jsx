import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';
import { IconContext } from 'react-icons';
import { WiDaySunny } from 'react-icons/wi';
import { Link as RouterLink } from 'react-router-dom';

import WelcomeScreen from './../components/WelcomeScreen';

const WelcomePage = () => {
  return (
    <WelcomeScreen>
      <Grid container direction='column' justify='center' className='full'>
        <div className='highlight'>
          <Grid item container xs={12} justify='center' alignItems='center'>
            <Grid item>
              <IconContext.Provider value={{ size: '6em' }}>
                <WiDaySunny />
              </IconContext.Provider>
            </Grid>
            <Grid item container direction='column' justify='center' alignItems='center'>
              <Typography variant='h4' color='inherit'>
                Weather App
              </Typography>
              <Link color='inherit' aria-label='menu' component={RouterLink} to='/main'>
                Ingresar
              </Link>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </WelcomeScreen>
  );
};

export default WelcomePage;
