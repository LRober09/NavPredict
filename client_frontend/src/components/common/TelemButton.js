import React from 'react';
import {withTelemetry} from '../../telemetry/components/withTelemetry';
import Button from '../common/Button';

const TelemButton = ({handler, onInteraction, children, ...otherProps}) => {
    const onClick = () => {
        onInteraction(handler);
    };

    return (
        <Button onClick={onClick} {...otherProps}>{children}</Button>
    )
};

export default withTelemetry(TelemButton);