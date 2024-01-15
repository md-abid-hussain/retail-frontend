import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    token:null,
    isLoggedIn:false,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            const {accessToken} = action.payload;
            state.token = accessToken;
            state.isLoggedIn = true;
        },


        logout:(state,action)=>{
            state.token = null;
            state.isLoggedIn = false;
        }
    }
})

export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;