const BUTTON_TELEMETRY = {
    LOGIN_BUTTON: {
        controlId: 'login_button',
        controlType: 'mutation',
        actionType: 'click',
        intent: {
            completion: true,
            label: 'login',
        }
    },
    NAV_PRODUCTS_BUTTON: {
        controlId: 'nav_products_button',
        controlType: 'navigation',
        actionType: 'click',
    },
    NAV_HOME_LINK: {
        controlId: 'nav_home_link',
        controlType: 'navigation',
        actionType: 'click',
    },
    NAV_PRODUCTS_LINK: {
        controlId: 'nav_products_link',
        controlType: 'navigation',
        actionType: 'click',
    }
};



const FORM_TELEMETRY = {
    LOGIN_PASSWORD_FIELD: {
        controlId: 'login_password_field',
        controlType: 'mutation',
        actionType: 'onBlur',
    }
};


export {BUTTON_TELEMETRY, FORM_TELEMETRY};