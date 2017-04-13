import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import images from './manifest.js';

ReactDOM.render(
  <App images={images} />,
  document.getElementById('root')
);
