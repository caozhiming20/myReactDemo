import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Record from './components/Records';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Record />, document.getElementById('root'));
registerServiceWorker();
