import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import { Home } from './Home' 
import * as sportiveScroll from './utils/sportiveScroll'

// Initializing Scroll Events
sportiveScroll.init()


ReactDOM.render(<Home />, document.getElementById('root'));


// if (module.hot) {
//     module.hot.accept();
// }