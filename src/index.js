import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { version } from '../package.json';

if (process.env.NODE_ENV === 'production') {
  console.log(version, process.env.REACT_APP_JOB_ID);
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
