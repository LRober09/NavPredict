import React, {Component} from 'react';
import store from 'store';
import {withRouter} from 'react-router-dom';
import NavLink from './NavLink';
import PropTypes from 'prop-types';
import {AppContextConsumer} from '../Context';

import "./navbar.scss";

class Navbar extends Component {

    handleNav = (path) => {
        this.props.history.push(path);
    };

    render() {
        const storeEmail = store.get('email');
        const {toggleAuthModal, location} = this.props;
        const path = location.pathname;
        return (
            <AppContextConsumer>
                {({user}) => (
                    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-container">
                        <a className="navbar-brand text-primary" href="/">Test Store</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <NavLink active={path === '/'} handleNav={() => this.handleNav('/')}>Home</NavLink>
                                <NavLink active={path === '/products'} handleNav={() => this.handleNav('/products')}>Products</NavLink>
                                <li className="nav-item">
                                    <span className="nav-link">Social</span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link">Secret Features</span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link">About Us</span>
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <span className="nav-link"><span className="oi oi-cart"/> Cart (0)</span>
                                </li>
                                <li className="nav-item">
                                    {
                                        user.email ? (
                                            <span className="nav-link">{user.email}</span>
                                        ) : storeEmail ? (
                                            <span className="nav-link">{storeEmail}</span>
                                        ) : (
                                            <span className="nav-link" onClick={toggleAuthModal}>Login/Register</span>
                                        )
                                    }
                                </li>
                            </ul>
                        </div>
                    </nav>
                )}
            </AppContextConsumer>
        )
    }
}

Navbar.propTypes = {
    toggleAuthModal: PropTypes.func,
};

export default withRouter(Navbar);