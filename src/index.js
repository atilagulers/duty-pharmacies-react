import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../src/scss/custom.scss';
import {Provider} from 'react-redux';
import {store} from './redux/app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider>
    <App store={store} />
  </Provider>
);
