import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Map from './pages/Map';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Map} path="/" exact />
    </BrowserRouter>
  );
};

export default Routes;
