import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import  store  from './app/store'; // Redux store import
import App from './App'; // App component import
import './styles.css'; // CSS import

// ReactDOM rendering to root div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
