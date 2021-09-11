import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../reducers/loginSlice';
import registerSlice from '../reducers/registerSlice';

export default configureStore({
    reducer: {
        registration: registerSlice,
        login: loginSlice,
    },
});