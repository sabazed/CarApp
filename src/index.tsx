import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CentralContextProvider } from './stores/CentralContext';
import { StorageContextProvider } from './stores/StorageContext';
import CentralController from './api/CentralController';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CentralContextProvider>
      <StorageContextProvider>
        <CentralController>
          <App />
        </CentralController>
      </StorageContextProvider>
    </CentralContextProvider>
  </React.StrictMode>
);
