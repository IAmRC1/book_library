import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/custom.scss';
import App from './App';
import { ToastContainer } from 'react-toastify';

const root = document.getElementById('root')

ReactDOM.render(
  <>
    <ToastContainer autoClose={2000} />
    <App />
  </>, root
);
