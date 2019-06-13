import {generateNewInteraction, appendSession, endSession} from "./context/TelemetryGlobal";

const onInteraction = (provider, caller, handler, controlId, controlType, actionType, intent) => {
    handler && handler();

    if (['withTelemetry'].indexOf(caller) === -1) {
        console.warn("You are modify the internal telemetry state from outside one of its components. This is not recommended!");
    }

    const interaction = generateNewInteraction(controlId, controlType, actionType, intent);

    appendSession(interaction);
    console.log("Appended: ", interaction);

    if (intent.completion) {
        endSession();
    }
};


const onPrediction = (prediction) => {

};

export {onInteraction};