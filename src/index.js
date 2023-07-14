import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
const rootElement = document.getElementById('root');
if (isTouchDevice) {
  rootElement.classList.add('touch-device');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

