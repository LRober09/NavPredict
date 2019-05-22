import React, {Component} from 'react';

import Container from '../layout/Container';
import Row from '../layout/Row';
import Col from '../layout/Col';
import ProductCard from "./ProductCard";
import Loader from "../common/Loader";

class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            hasError: false,
        }
    }

    componentDidMount() {
        const url = 'http://localhost:8000/products';
        fetch(url, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({products: data})
        })
    }

    render() {
        const {products} = this.state;

        const productDisplay = products.length > 0 ? products.map((product, i) => {
            return (
                <Col w={4} key={i}>
                    <ProductCard product={product}/>
                </Col>
            )
        }) : (
            <Col w={12}>
                <Loader/>
            </Col>
        );

        return (
            <Container>
                <Row>
                    <Col>
                        <h2 className="display-4">All Products</h2>
                    </Col>
                </Row>
                <Row>
                    {productDisplay}
                </Row>
            </Container>
        )
    }
}

export default Products;