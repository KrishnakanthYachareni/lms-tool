import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
const store = Store();

// if (process.env.NODE_ENV !== 'production') {
//   console.log = () => {}
//   console.error = () => {}
//   console.debug = () => {}
// }
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
