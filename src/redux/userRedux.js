import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        success: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFail: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        registerStart: (state) => {
            state.isFetching = true;
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.success = true;
            state.currentUser = action.payload;
        },
        registerFail: (state) => {
            state.isFetching = false;
            state.error = true;
            state.success = false;
        },

        updateStart: (state) => {
            state.isFetching = true;
            state.error = false;
            state.success = false;
        },
        updateSuccess: (state, action) => {
            state.isFetching = false;
            state.success = true;
            state.currentUser = action.payload;
        },
        updateFail: (state) => {
            state.isFetching = false;
            state.error = true;
            state.success = false;
        },

        reset: (state) => {
            state.isFetching = false;
            state.success = false;
            state.error = false;
        },

        logout: (state) => {
            state.currentUser = null;
        }
    }
});

export const {
    loginStart,
    loginSuccess,
    loginFail,
    registerStart,
    registerSuccess,
    registerFail,
    reset,
    logout,
    updateStart,
    updateSuccess,
    updateFail } = userSlice.actions;
export default userSlice.reducer;