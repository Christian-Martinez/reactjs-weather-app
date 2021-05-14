import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import Clouds from 'vanta/dist/vanta.clouds.min';

const WelcomeScreen = ({ children }) => {
  const myRefDiv = useRef(null);
  const [vanta, setVanta] = useState(0);
  /* la primera vez devolvera el valor inicial */
  console.log('myRefDiv.current', myRefDiv.current);

  useEffect(() => {
    /* en este devuelve el div cargado */
    console.log('myRefDiv.current in useEffect', myRefDiv.current);
    if (!vanta) {
      setVanta(Clouds({ THREE, el: myRefDiv.current }));
      console.log('se ejecuto setVanta');
    }
    /* al salir de la pantalla debemos detener el effect y des-asociar los recursos */
    return () => {
      /* destruir los recursos tomados por vanta */
      if (vanta) {
        vanta.destroy();
        console.log('libero los recursos');
      }
    };
  }, [vanta]);

  return <div ref={myRefDiv}>{children}</div>;
};

WelcomeScreen.propTypes = {
  children: PropTypes.node,
};

export default WelcomeScreen;
