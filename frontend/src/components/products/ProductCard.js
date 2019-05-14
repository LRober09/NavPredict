import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Button from '../common/Button';

class ProductCard extends Component {
    render() {
        const {product} = this.props;

        return (
            <div className="card">
                <img className="card-img-top" src="https://cdn.shopify.com/s/files/1/1213/4300/products/DSC6561_1024x1024.jpg?v=1466705439" alt={product.name}/>
                <div className="card-body">
                    <div className="text-center">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="lead">{'$' + product.price}</p>
                        <Button color="primary">Add to Cart</Button>
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