import React from 'react';

const AppContext = React.createContext();

const AppContextConsumer = AppContext.Consumer;

class AppProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            cart: [],
            testVal: "hello world!",
        }
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}



export {AppContext, AppContextConsumer, AppProvider};