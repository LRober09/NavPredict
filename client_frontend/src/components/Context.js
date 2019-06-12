import React from 'react';

const AppContext = React.createContext();

const AppContextConsumer = AppContext.Consumer;

class AppProvider extends React.Component {
    constructor(props) {
        super(props);

        this.setUser = (user) => {
            this.setState({user: user})
        };


        this.state = {
            user: {},
            cart: [],
            testVal: "hello world!",
            setUser: this.setUser,
        };


    }

    render() {
        const {children} = this.props;

        return (
            <AppContext.Provider value={this.state}>
                {children}
            </AppContext.Provider>
        )
    }
}



export {AppContext, AppContextConsumer, AppProvider};