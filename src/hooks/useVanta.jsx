import { useRef, useEffect, useState } from 'react';
import Clouds from 'vanta/dist/vanta.clouds.min';
import * as THREE from 'three';

const useVanta = () => {
  const myRefDiv = useRef(null);
  const [vanta, setVanta] = useState(0);

  useEffect(() => {
    /* en este devuelve el div cargado */
    if (!vanta) {
      setVanta(
        Clouds({
          THREE,
          el: myRefDiv.current,
        })
      );
    }
    /* al salir de la pantalla debemos detener el effect y des-asociar los recursos */
    return () => {
      if (vanta) vanta.destroy();
    };
  }, [vanta]);

  return myRefDiv;
};

export default useVanta;
