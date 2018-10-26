import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Home } from './pages/Home' 
import * as sportiveScroll from './utils/sportiveScroll'

// Inicializando a lib: Scroll Events (registrando o evento no scroll global)
sportiveScroll.init()

ReactDOM.render(<Home />, document.getElementById('root'));


// if (module.hot) {
//     module.hot.accept();
// }