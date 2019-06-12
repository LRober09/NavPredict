import React from 'react';
import PropTypes from 'prop-types';
import {telemetizedControl} from 'predict-telemetry';
import Button from "../components/common/Button";

const TelemetizedButton = telemetizedControl(
    (setControl, executeReq, props) => setControl(
        <Button onClick={() => executeReq(props.controlType, props.telemId)} {...props}>
            {props.children}
        </Button>
    )
);

TelemetizedButton.propTypes = {
    controlType: PropTypes.oneOf([
        'nav',
        'post',
        'put',
        'get',
    ]).isRequired,
    executeReq: PropTypes.func.isRequired
};

export default TelemetizedButton;


const interaction = {
    dateTime: '2019-06-10T06:06:48+02:00',
    controlId: 'submit_login_form',
    controlType: 'submit',
    actionType: 'click',
    intent: {
        completion: true,
        label: 'login',
    },
};

const session = {
    userId: '5cfef5337611343fe4315e01',
    sessionId: '5cff016c651dfd3c088cf7bf',
    interactions: [
        //...
        interaction,
    ],
    intentLabel: 'login',
    sessionEndDateTime: '2019-06-10T06:06:48+02:00',
};
const deferedHandler = () => {
};
const UsersHandler = () => {
};
const UsersValidator = () => {
};
const app = {
    get: () => {
    }
};
const DefaultHandler = {
    notFound: () => {
    }
};

const endpoints = {
    users: {
        endpoint: '/users',
        handler: UsersHandler,
        validator: UsersValidator,
        methods: ['get', 'post'],
    },
};

const routes = (app) => {
    Object.keys(endpoints).forEach((epKey) => {
        const endpoint = endpoints[epKey];
        const path = endpoint.endpoint;
        const methods = endpoint.methods;

        methods.forEach((method) => {
            app[method](path, (req, res, next) => {
                deferedHandler({
                    handler: endpoint.handler[method],
                    validator: endpoint.validator[method],
                    request: req,
                    response: res,
                    next: next,
                });
            });
        })
    });

    // Handle unknown routes with 404
    app.use(DefaultHandler.notFound)
};


let test = session;
test = routes;