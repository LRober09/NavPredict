import React, {Component} from 'react';
import Button from "../common/Button";

import Jumbotron from "../common/Jumbotron";
import Container from "../layout/Container";
import Col from '../layout/Col';
import Row from '../layout/Row';

class Home extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <Col w={12}>
                        <Jumbotron>
                            <div className="text-center">
                                <h2 className="display-4 text-info">Welcome to the Store!</h2>
                                <p className="lead">This site was built to take your data- have fun!</p>
                                <Button type="link" path="/products" size="lg">Go to Products</Button>
                            </div>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;