import handleResponse from "./handleResponse";

export const userService ={
    register,
    login,
    current
}

function register(user) {
    const requestOptions ={
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch('/users/register', requestOptions).then(handleResponse);
}

function login(email, password){
    const requestOptions ={
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
    };
    return fetch('/users/authenticate', requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('token', user.token);
            return user;
        });
}

function current(){
    const token = localStorage.token;
    const requestOptions ={
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };
    return fetch('/users/current', requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}
