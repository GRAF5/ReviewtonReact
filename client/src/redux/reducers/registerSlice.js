import { createSlice } from "@reduxjs/toolkit";
import { userService } from "../../utils/services/userService";

export const registerSlice = createSlice({
        name: 'registration',
        initialState: {
                registering: false,
                errors: null,
        },
        reducers: {
                registerRequest: (state) => {
                        state.registering = true;
                },
                registerSuccsess: (state) => {
                        state.registering = false;
                },
                registerFailure: (state, action) => {
                        state.registering = false;
                        state.errors = action.payload;
                },
        },
})

export const {registerRequest, registerSuccsess, registerFailure} = registerSlice.actions;

export default registerSlice.reducer