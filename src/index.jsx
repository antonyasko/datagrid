import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import App from './components/App';
import TableRows from './components/TableBody/tableBody';

import './index.scss';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
  // eslint-disable-next-line no-underscore-dangle
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
render(
  <Provider store={store}>
    <TableRows />
  </Provider>,
  document.getElementById('rows')
);
