import {generateId} from "../util/telemUtil";
import {fetchWrapper} from '../util/apiWrapper';

const initTelemetryService = (options) => {
    const userId = options.userId || generateId();
    if (!options.telemetryApiUri && !globalState.telemetryApiUri) {
        throw new Error('Cannot initialize telemetry global state - no telemetry API URI provided');
    }

    globalState.telemetryApiUri = options.telemetryApiUri;
    globalState.userId = userId;

    generateNewSession();
};

const globalState = {
    initialized: false,
    userId: null,
    telemetryApiUri: null,

    currentSession: {
        userId: null,
        sessionId: null,
        interactions: [],
        intentLabel: null,
        sessionEndDateTime: null,
    },

    initTelemetryService: initTelemetryService,
};

const getGlobalState = () => globalState;

const generateNewSession = () => {
    if (!globalState.userId || !globalState.telemetryApiUri) {
        throw new Error('Could not generate new session - telemetry state is not initialized');
    }

    globalState.currentSession = {
        userId: globalState.userId,
        sessionId: generateId(),
        interactions: [],
        intentLabel: null,
        sessionEndDateTime: null,
    }
};

const endSession = () => {
    globalState.currentSession.interactions = globalState.currentSession.interactions.sort((a, b) => {
        return a.dateTime >= b.dateTime;
    });
    const interactions = globalState.currentSession.interactions;

    const intentInteraction = interactions[interactions.length - 1];

    globalState.currentSession.sessionEndDateTime = intentInteraction.dateTime;
    globalState.currentSession.intentLabel = intentInteraction.intent.label;
    const currentSession = globalState.currentSession;
    fetchWrapper(currentSession, globalState.telemetryApiUri + '/sessions', 'POST', (response) => {
        console.log('Successfully pushed session!');
        console.log('Response: ', response)
    }, (err) => {
        console.error('Error: ', err);
    }, () => {
        console.log('Pushing session to server: ', currentSession);
    });

    generateNewSession();
};

const generateNewInteraction = (controlId, controlType, actionType, intent) => {
    return {
        dateTime: new Date().toISOString(),
        controlId: controlId,
        controlType: controlType,
        actionType: actionType,
        intent: intent ? {
            completion: intent.completion || null,
            label: intent.label || null,
        } : null,
    }
};

const appendSession = (interaction) => {
    if (!globalState.userId || !globalState.telemetryApiUri) {
        throw new Error('Could not generate new session - telemetry state is not initialized');
    }

    globalState.currentSession.interactions.push(interaction);
};

const setUserId = (userId) => {
    globalState.userId = userId;
    globalState.currentSession.userId = userId;
};


export {
    getGlobalState,
    initTelemetryService,
    generateNewSession,
    endSession,
    generateNewInteraction,
    appendSession,
    setUserId
};