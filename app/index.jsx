import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';

import Routes from './components/routes';
import appStore from './stores/appStore';

import( './styles/main.scss' );

const app = () => {
  render(
    <Router>
      <Provider store={ appStore }>
        <Routes />
      </Provider>
    </Router>,
    document.getElementById( 'root' ),
  );
};

app();
