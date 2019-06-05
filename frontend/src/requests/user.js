import {usersUrl, loginUrl} from "./variables";

const loginUser = (loginObject, onSuccess, onError, onStart, onComplete) => {
    fetchWrapper(loginObject, loginUrl, "POST", onSuccess, onError, onStart, onComplete);
};


const registerUser = (newUserObject, onSuccess, onError, onStart, onComplete) => {
    fetchWrapper(newUserObject, usersUrl, "POST", onSuccess, onError, onStart, onComplete);
};

const fetchWrapper = (body, url, method, onSuccess, onError, onStart, onComplete) => {
    onStart();
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => {
        return res.json();
    }).then((result) => {
        onComplete();
        if(result.Error) {
            throw new Error(result.Error).message;
        } else {
            onSuccess(result);
        }
    }).catch((err) => {
        console.error("Error: ", err);
        onError(err);
    });
};

export {loginUser, registerUser};