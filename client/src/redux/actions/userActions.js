import { userService } from "../../utils/services/userService";
import {registerRequest, registerSuccsess, registerFailure} from "../reducers/registerSlice";
import {loginRequest, loginSuccsess, loginFailure, logoutRequest, currentFailure} from "../reducers/loginSlice";
import { navigate } from "@reach/router";

export const userActions = {
    register,
    login,
    logout,
    current
}

function register(user) {
    return dispatch => {
        dispatch(registerRequest());
        userService.register(user)
        .then(
            user => {
                dispatch(registerSuccsess());
                navigate('/login');
            },
            error => {
                dispatch(registerFailure(error));
            }
        );
    }
}

function login(email, password, from) {
    return dispatch => {
        dispatch(loginRequest());
        userService.login(email, password)
        .then(
            user => {
                dispatch(loginSuccsess(user));
                navigate(from);
            },
            error => {
                dispatch(loginFailure(error));
            }
        );
    }
}

function logout(){
    return dispatch => {
        dispatch(logoutRequest());
        localStorage.setItem('user', "");
    }
}

function current(){
    return dispatch => {
        userService.current()
            .then(
                user => {
                    dispatch(loginSuccsess(user));
                },
                error => {                                
                    localStorage.removeItem('token');
                    dispatch(currentFailure());
                }
            )
    }
}