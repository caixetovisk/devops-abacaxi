import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { IdiomaProvider } from './i18n.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IdiomaProvider>
      <App />
    </IdiomaProvider>
  </React.StrictMode>
);
