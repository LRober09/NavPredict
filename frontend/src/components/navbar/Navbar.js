import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import NavLink from './NavLink';
import PropTypes from 'prop-types';

import "./navbar.scss";

class Navbar extends Component {

    handleNav = (path) => {
        this.props.history.push(path);
    };

    render() {
        const {toggleAuthModal} = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-container">
                <a className="navbar-brand text-primary" href="/">Test Store</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <NavLink active handleNav={() => this.handleNav('/')}>Home</NavLink>
                        <NavLink handleNav={() => this.handleNav('/products')}>Products</NavLink>
                        <li className="nav-item">
                            <span className="nav-link">About Us</span>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="nav-link"><span className="oi oi-cart"/> Cart (0)</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link" onClick={toggleAuthModal}>Login/Register</span>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    toggleAuthModal: PropTypes.func,
};

export default withRouter(Navbar);