import React from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import Header from './header/index';
import Landing from '../views/landing/index';
import Jobs from '../views/jobs/index';

const Routes = observer( () => (
  <div>
    <Header />
    <Route exact path="/" component={ Landing } />
    <Route path="/jobs" component={ Jobs } />
  </div>
) );

export default Routes;
