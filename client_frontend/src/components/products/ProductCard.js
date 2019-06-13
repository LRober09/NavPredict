import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '../common/Button';
import TelemButton from '../common/TelemButton';
import './ProductCard.scss';

import {BUTTON_TELEMETRY} from "../../util/telemetryOptions";

import {formatUsd} from '../../util/format';

class ProductCard extends Component {
    render() {
        const {product, ...props} = this.props;
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
                            product.stock > 0 ? (
                                <Button color="primary" block><span className="oi oi-cart"/> Add to Cart</Button>
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

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;