import { configureStore } from "@reduxjs/toolkit";
import userreducer from './slice'
export const store = configureStore({
     reducer:{
        userReducer:userreducer,
     }
});
