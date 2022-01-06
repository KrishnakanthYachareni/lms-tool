import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    user: {
        data: {},
        loading: false,
        error: false
    },
    problemStatements: {
        data:[],
        loading: false,
        error: false
    },
    problemStatementsAll: {
        data:[],
        loading: false,
        error: false
    },
    tags:{
        data:[],
        loading: false,
        error: false
    },
    dashboardData :{
        data:[],
        loading: false,
        error: false
    },
}

const loginSlice = createSlice({
    name: "appManager",
    initialState,
    reducers: {
        loadUserLogin(state) {
            state.user.loading = true;
            state.user.error = false
        },

        userLoginLoaded(state, { payload }) {
            console.log('check123',payload)
            state.user.data = payload.data
            state.user.loading = false;
            state.user.error = false
        },

        userLoginError(state) {
            console.log('state.data')
            state.user.loading = false;
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

        loadProblemStatements(state) {
            state.problemStatements.loading = true;
            state.problemStatements.error = false
        },

        problemStatementsLoaded(state, { payload }) {
            console.log('check123',payload)
            state.problemStatements.data = payload
            state.problemStatements.loading = false;
            state.problemStatements.error = false
        },

        problemStatementsLoadingError(state) {
            state.problemStatements.loading = true;
            state.problemStatements.error = true
        },

        loadProblemStatementsAll(state) {
            state.problemStatementsAll.loading = true;
            state.problemStatementsAll.error = false
        },

        problemStatementsLoadedAll(state, { payload }) {
            state.problemStatementsAll.data = payload
            state.problemStatementsAll.loading = false;
            state.problemStatementsAll.error = false
        },

        problemStatementsLoadingErrorAll(state) {
            state.problemStatementsAll.loading = true;
            state.problemStatementsAll.error = true
        },


        loadTags(state) {
            state.tags.loading = true;
            state.tags.error = false
        },

        tagsLoaded(state, { payload }) {
            state.tags.data = payload
            state.tags.loading = false;
            state.tags.error = false
        },

        tagsLoadingError(state) {
            state.tags.loading = true;
            state.tags.error = true
        },

        loadDashboardData(state) {
            state.dashboardData.loading = true;
            state.dashboardData.error = false
        },

        dashboardDataLoaded(state, { payload }) {
            console.log('here')
            state.dashboardData.data = payload
            state.dashboardData.loading = false;
            state.dashboardData.error = false
        },

        dashboardDataLoadingError(state) {
            state.dashboardData.loading = true;
            state.dashboardData.error = true
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
    loadProblemStatements,
    tagsLoaded,
    tagsLoadingError,
    loadTags,
    dashboardDataLoaded,
    dashboardDataLoadingError,
    loadDashboardData,
    loadProblemStatementsAll,
    problemStatementsLoadedAll,
    problemStatementsLoadingErrorAll
    
} = loginSlice.actions

export default loginSlice.reducer;