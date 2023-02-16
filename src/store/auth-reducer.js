import { createSlice } from "@reduxjs/toolkit";

const initialIdToken = localStorage.getItem('idToken');
const initialEmail = localStorage.getItem('email');

const authInitialState = {
    idToken: initialIdToken,
    email: initialEmail,
    isLogin: !!initialIdToken
}

const AuthSlice = createSlice({
    name: 'authentication',
    initialState: authInitialState,
    reducers: {
        login(state, action){
            state.idToken = action.payload.idToken;
            state.email = action.payload.email;
            state.isLogin = action.payload.idToken;
            localStorage.setItem('idToken', state.idToken);
            localStorage.setItem('email', state.email);
        },
        logout(state){
            state.idToken = null;
            state.isLogin = false;
            localStorage.removeItem('idToken');
            localStorage.removeItem('email');
        }
    }
});

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;