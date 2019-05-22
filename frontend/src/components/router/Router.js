import React, {Component} from 'react';

import {BrowserRouter, Route} from "react-router-dom";

import Home from '../home/Home';
import Products from '../products/Products';
import Navbar from "../navbar/Navbar";
import ProductDetail from "../products/ProductDetail";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={Navbar}/>
                <Route path="/" exact component={Home}/>
                <Route path="/products" exact component={Products}/>
                <Route path="/products/:productId" component={ProductDetail}/>
            </BrowserRouter>
        )
    }
}

export default Router;