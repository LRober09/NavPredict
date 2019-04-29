import React, {Component} from 'react';
import {Button} from 'reactstrap';

class App extends Component {
    render() {
        return (
            <div>
                <span className="btn btn-danger btn-pill">Test</span>
                <div className="card" style={{margin: '5rem'}}>
                    <div className="card-body">
                        test
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
