import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import { ContextStoreProvider } from './ContextStore';

ReactDOM.render(
  <React.StrictMode>
    <ContextStoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ContextStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
