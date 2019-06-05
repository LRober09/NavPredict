import React, {Component} from 'react';

import {BrowserRouter, Route} from "react-router-dom";

import Home from '../home/Home';
import Products from '../products/Products';
import Navbar from "../navbar/Navbar";
import AuthModal from '../authentication/AuthModal';
import ProductDetail from "../products/ProductDetail";

class Router extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authModalOpen: false,
        }
    }

    toggleAuthModal = () => {
      this.setState({authModalOpen: !this.state.authModalOpen});
    };

    render() {
        return (
            <BrowserRouter>
                <Route path="/" component={() => <Navbar toggleAuthModal={this.toggleAuthModal}/>}/>
                <Route path="/" component={() => <AuthModal isOpen={this.state.authModalOpen} onClose={this.toggleAuthModal}/>}/>
                <Route path="/" exact component={Home}/>
                <Route path="/products" exact component={Products}/>
                <Route path="/products/:productId" component={ProductDetail}/>
            </BrowserRouter>
        )
    }
}

export default Router;