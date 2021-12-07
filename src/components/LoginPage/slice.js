import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user: {
        data: {},
        loading: false,
        error: false
    }
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loadUserLogin(state) {
            state.user.loading = true;
            state.user.error = false
        },

        userLoginLoaded(state, { payload }) {
            state.user.data = payload
            state.user.loading = false;
            state.user.error = false
        },
        userLoginError(state) {
            state.user.loading = true;
            state.user.error = true
        }
    }
})

export const {
    loadUserLogin,
    userLoginLoaded,
    userLoginError

} = loginSlice.actions

export default loginSlice.reducer;