import React from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom';
import App from './App';

import 'mapbox-gl/dist/mapbox-gl.css';

// https://github.com/mapbox/mapbox-gl-js/issues/10173#issuecomment-750489778
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('root'));
