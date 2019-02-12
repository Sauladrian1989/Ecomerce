import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import ReactDOM from 'react-dom';
import {ProductProvider} from './context';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDGFipiyBHx7xHrO95j86I7yOH7Mf0og38",
  authDomain: "evaluacionreact.firebaseapp.com",
  databaseURL: "https://evaluacionreact.firebaseio.com",
  projectId: "evaluacionreact",
  storageBucket: "evaluacionreact.appspot.com",
  messagingSenderId: "392224009031"
});

ReactDOM.render(
    <ProductProvider>
    <Router>
        <App/>
    </Router>
    </ProductProvider>
  ,  
document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
