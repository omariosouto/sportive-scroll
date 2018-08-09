import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as sportiveScroll from './utils/sportiveScroll'

// Initializing Scroll Events
sportiveScroll.init()


ReactDOM.render(<App />, document.getElementById('root'));


// if (module.hot) {
//     module.hot.accept();
// }