import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthorized : false,
    userData : null
}

export const userSlice = createSlice({
    name : "user",
    initialState, 
    reducers : {
        signIn : (state, action) => {
            state.isAuthorized = true
            state.userData = action.payload
        },
        signOut : (state) => {
            state.isAuthorized = false
            state.userData = null
        }
    }
})

export const {signIn, signOut} = userSlice.actions

export default userSlice.reducer