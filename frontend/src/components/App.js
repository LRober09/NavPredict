import React from 'react';

import Router from './router/Router';
import Navbar from "./navbar/Navbar";


function App() {
  return (
    <React.Fragment>
        <Navbar/>
        <Router/>
    </React.Fragment>
  );
}

export default App;
