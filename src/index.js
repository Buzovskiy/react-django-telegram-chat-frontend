import React from 'react';
import ReactDOM from 'react-dom';
import App from './chat/App';
if (+process.env.REACT_APP_CHAT_IMPORT_FONTAWESOME) require('./css/fontawesome-5/css/all.min.css');

var root = document.querySelector('.container.chat');

ReactDOM.render(
  <React.StrictMode>
    <App {...root.dataset}/>
  </React.StrictMode>,
  root
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
