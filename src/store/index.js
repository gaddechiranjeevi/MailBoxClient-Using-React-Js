import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-reducer";
import composeReducer from "./compose-reducer";

const store = configureStore({
    reducer: {
        authentication: authReducer,
        compose: composeReducer
    }
})

export default store;