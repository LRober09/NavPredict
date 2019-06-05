import React from 'react';
import {AppProvider} from "./Context";
import Router from './router/Router';


function App() {
    return (
        <AppProvider>
            <Router/>
        </AppProvider>
    );
}

export default App;
