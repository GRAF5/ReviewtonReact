import { createSlice, current } from "@reduxjs/toolkit";
import { userService } from "../../utils/services/userService";

export const loginSlice = createSlice({
        name: 'login',
        initialState: {
            logging: false,
            loggedIn: false,
            user: null,
            errors: null,
        },
        reducers: {
                loginRequest: (state) => {
                        state.logging = true;
                        state.errors = null;
                },
                loginSuccsess: (state, action) => {
                        state.loggedIn = true;
                        state.logging = false;
                        state.user = action.payload;
                },
                loginFailure: (state, action) => {
                        state.logging = false;
                        state.errors = action.payload;
                },
                logoutRequest: (state) => {
                        state.loggedIn = false;
                        state.user = null;
                },
                currentFailure: (state) => {
                        state.logging = false;
                        state.loggedIn = false;            
                }
        },
})

export const {loginRequest, loginSuccsess, loginFailure, logoutRequest, currentFailure} = loginSlice.actions;

export default loginSlice.reducer