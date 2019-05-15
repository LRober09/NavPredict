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
        const url = 'http://localhost:8000' + '/products';
        console.log("Url: ", url);
        fetch(url, {
            method: 'GET'
        }).then((response) => {
            console.log(response);
            return response.json();
        }).then((data) => {
            this.setState({products: data})
        })
    }

    render() {
        const {products} = this.state;

        const productDisplay = products.length > 0 ? products.map((product, i) => {
            return (
                <Col key={i} w={4}>
                    <ProductCard product={product}/>
                </Col>
            )
        }) : (
            <Col w={12}>
                <Loader/>
            </Col>
        );

        console.log("Products: ", products);
        console.log("Product cards: ", productDisplay);

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