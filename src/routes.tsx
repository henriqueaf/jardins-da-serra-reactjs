import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Map from './pages/Map';

const Routes = () => {
  const baseUrl = process.env.PUBLIC_URL;

  return (
    <BrowserRouter>
      <Route component={Map} path={baseUrl + '/'} exact />
    </BrowserRouter>
  );
};

export default Routes;
