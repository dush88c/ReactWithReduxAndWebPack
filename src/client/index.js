import { Provider } from 'react-redux';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import './app.css';
import App from './app';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

const render = (Component) => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <Component />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      document.getElementById('root'),
    );
  };

  render(App);