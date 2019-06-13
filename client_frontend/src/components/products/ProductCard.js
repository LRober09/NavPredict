import React, {Component} from 'react';
import store from 'store';
import PropTypes from 'prop-types';

import Button from '../common/Button';
import TelemButton from '../common/TelemButton';
import './ProductCard.scss';

import {addToUserCart, removeFromUserCart} from "../../requests/user";

import {AppContext} from "../Context";
import {BUTTON_TELEMETRY} from "../../util/telemetryOptions";

import {formatUsd} from '../../util/format';

class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false,
        }
    }

    handleAdd = () => {
        const token = store.get('token');
        addToUserCart(token, this.props.product.id, (result) => {
            this.context.setUser(result);
        }, (err) => {
            console.error(err);
        }, () => {
            this.setState({isSubmitting: true});
        }, () => {
            this.setState({isSubmitting: false});
        });
    };

    handleRemove = () => {
        const token = store.get('token');
        removeFromUserCart(token, this.props.product.id, (result) => {
            this.context.setUser(result);
        }, (err) => {
            console.error(err);
        }, () => {
            this.setState({isSubmitting: true});
        }, () => {
            this.setState({isSubmitting: false});
        });
    };

    render() {
        const {product, add, ...props} = this.props;
        const inCart = this.context.user.profile.cart.indexOf(product.id) !== -1;
        return (
            <div className="card" {...props}>
                <img className="card-img-top" src={product.imgUrl} alt={product.name} style={{height: '300px'}}/>
                <div className="card-body">
                    <div className="text-center">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="lead">{formatUsd(product.price)}</p>
                        <TelemButton color="primary"
                                     type="link"
                                     path={"/products/" + product.id}
                                     outline
                                     block
                                     controlIdSuffix={product._id}
                                     {...BUTTON_TELEMETRY.PROD_DETAIL_BUTTON}>
                            Details
                        </TelemButton>
                        {
                            product.stock > 0 ? inCart ? (
                                <Button color="danger" block onClick={this.handleRemove} outline disabled={this.state.isSubmitting}>
                                    <span className="oi oi-x"/> Remove from Cart
                                </Button>
                            ) : (
                                <Button color="primary" block onClick={this.handleAdd}
                                        disabled={this.state.isSubmitting}><span
                                    className="oi oi-cart"/> Add to Cart</Button>
                            ) : (
                                <Button block color="danger" outline disabled>Out of Stock</Button>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

ProductCard.contextType = AppContext;

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;