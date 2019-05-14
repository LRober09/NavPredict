import React, {Component} from 'react';

import "./navbar.scss";

class Navbar extends Component {
    render() {

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
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/products">Products</a>
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
                            <span className="nav-link">Login</span>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;