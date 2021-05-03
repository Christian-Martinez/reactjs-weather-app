import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      NotFoundPage
      <Link to='/main'>volver a main</Link>
    </div>
  );
};

export default NotFoundPage;
