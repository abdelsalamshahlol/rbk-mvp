import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

ReactDom.render(
    <App/>, document.getElementById('root')
);