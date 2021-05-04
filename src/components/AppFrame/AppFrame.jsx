import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, IconButton, Grid, Link, Typography, Toolbar } from '@material-ui/core';
import { IconContext } from 'react-icons';
import { Link as LinkRouter } from 'react-router-dom';
import { WiDaySunny } from 'react-icons/wi';
// import ErrorBoundary from './../../generic/ErrorBoundary'

const AppFrame = ({ children }) => {
  return (
    <Grid container justify='center'>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          {/* aria-label='menu' trabaja como un menu */}
          <IconButton color='inherit' aria-label='menu'>
            <Link component={LinkRouter} to='/main' color='inherit' aria-label='menu'>
              <IconContext.Provider value={{ size: '2em' }}>
                <WiDaySunny />
              </IconContext.Provider>
            </Link>
          </IconButton>
          <Typography variant='h6' color='inherit'>
            Weather App
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item xs={12} sm={11} md={10} lg={8}>
        {children}
      </Grid>
    </Grid>
  );
};

AppFrame.propTypes = {
  /* node hace referencia a cualquier elemento de react que sea valido */
  children: PropTypes.node,
};

export default AppFrame;
