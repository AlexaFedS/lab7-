import { configureStore } from "@reduxjs/toolkit";
import collectReducer from './collector/reducer';
import authReducer from './auth/reducer';

export const store=configureStore({
    reducer: {
        collector: collectReducer,
        isAuth: authReducer,
    },
})