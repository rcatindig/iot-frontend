import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import axios from 'axios';
import allReducers from './reducers';
import thunk from 'redux-thunk';
// TODO SEPARATE DEV AND PROD DEPENDENCIES (compose, configureStore)
import { 
  createStore, 
  applyMiddleware, 
  // compose 
} from 'redux';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import * as Constants from './helpers/Constants';

// DEVELOPMENT, redux debugger
// const store = createStore(
//   allReducers,
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// )

// Redux store
const store = createStore(allReducers, applyMiddleware(thunk))

const persistor = persistStore(store)

// Axios HTTP headers configuration 
axios.defaults.baseURL = Constants.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// Set token (if existing) on axios for all the requests
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
