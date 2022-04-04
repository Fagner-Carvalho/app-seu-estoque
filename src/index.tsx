import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import { SnackBarProvider } from 'src/context/SnackbarContext';

import configureStore from 'src/store';
import reportWebVitals from 'src/reportWebVitals';

import Routes from './routes';

const store = configureStore();
const rootElement = document.getElementById('root');

const app = (
  <React.StrictMode>
    <Provider store={store} context={ReactReduxContext}>
      <SnackBarProvider>
        <Routes />
      </SnackBarProvider>
    </Provider>
  </React.StrictMode>
);

ReactDOM[rootElement && rootElement.hasChildNodes() ? 'hydrate' : 'render'](app, rootElement);

reportWebVitals();
