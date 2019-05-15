import React, {Component} from 'react';

import {BrowserRouter, Route} from "react-router-dom";

import Home from '../home/Home';
import Products from '../products/Products';
import Navbar from "../navbar/Navbar";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={Navbar}/>
                <Route path="/" exact component={Home}/>
                <Route path="/products" component={Products}/>
            </BrowserRouter>
        )
    }
}

export default Router;