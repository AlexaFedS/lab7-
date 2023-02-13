import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'isAuth',
    initialState:{
        itemInAuth:null
    },
    reducers:{
        setIsAuthTrue:(state, action)=>{
            state.itemInAuth = true;
        },
        setIsAuthFalse:(state, action)=>{
            state.itemInAuth = false;
        }
    }
})

export const { setIsAuthTrue, setIsAuthFalse } = authSlice.actions;
export default authSlice.reducer;
