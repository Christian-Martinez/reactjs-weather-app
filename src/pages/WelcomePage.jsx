import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div>
      WelcomePage
      <Link to='/main'>Ir a main</Link>
    </div>
  );
};

export default WelcomePage;
