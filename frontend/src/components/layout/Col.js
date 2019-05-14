import React, {Component} from 'react';

class Col extends Component {
    render() {
        const {children, w, ...props} = this.props;
        // const {w, sm, md, lg, xl} = this.props;
        const classes = w === undefined ? "col" : "col-" + w;

        return (
            <div className={classes} {...props}>
                {children}
            </div>
        )
    }
}


export default Col;