import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    user: {
        data: {},
        loading: false,
        error: false
    },
    problemStatements: {
        data: {},
        loading: false,
        error: false
    }
}

const loginSlice = createSlice({
    name: "appManager",
    initialState,
    reducers: {
        loadUserLogin(state) {
            console.log(1234)
            state.user.loading = true;
            state.user.error = false
        },

        userLoginLoaded(state, { payload }) {
            console.log('check123',payload)
            state.user.data = payload
            state.user.loading = false;
            state.user.error = false
        },

        userLoginError(state) {
            state.user.loading = true;
            state.user.error = true
        },

        saveUserSignup(state) {
            state.user.loading = true;
            state.user.error = true
        },

        userRegisterLoaded(state, { payload }) {
            state.user.data = payload
            state.user.loading = false;
            state.user.error = false
        },

        userRegisterLoadingError(state) {
            state.user.loading = true;
            state.user.error = true
        },
        setUserData(state,{payload}){
            state.user.data = payload;
            state.user.loading = false;
            state.user.error = false;
        },

        loadproblemStatements(state) {
            state.problemStatements.loading = true;
            state.problemStatements.error = false
        },

        problemStatementsLoaded(state, { payload }) {
            state.problemStatements.data = payload
            state.problemStatements.loading = false;
            state.problemStatements.error = false
        },

        problemStatementsLoadingError(state) {
            state.problemStatements.loading = true;
            state.problemStatements.error = true
        },
    }
})

export const {
    loadUserLogin,
    userLoginLoaded,
    userLoginError,
    saveUserSignup,
    setUserData,
    problemStatementsLoaded,
    problemStatementsLoadingError,
    loadProblemStatements
} = loginSlice.actions

export default loginSlice.reducer;