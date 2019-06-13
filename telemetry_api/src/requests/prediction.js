const axios = require('axios');
const predictionUrl = 'http://localhost:8090/predict';

const requestCluster = (session, onSuccess, onError, onStart, onComplete) => {
    onStart && onStart();

    axios.post(predictionUrl, {
        session: session,
    }).then((response) => {
        onSuccess && onSuccess(response.data);
    }).catch((err) => {
        onError && onError(err);
    }).finally(() => {
        onComplete && onComplete();
    });
};


module.exports = {requestCluster};