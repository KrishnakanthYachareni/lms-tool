import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    user: {
        data: {},
        loading: false,
        error: false
    },
    problemStatements: {
        data: [],
        loading: false,
        error: false
    },
    uploadTemplate: {
        saving: false,
        error: false
    },
    templates: {
        data : [],
        loading: false,
        error: false
    },
    problemStatementsAll: {
        data: [],
        loading: false,
        error: false
    },
    tags: {
        data: [],
        loading: false,
        error: false
    },
    dashboardData: {
        data: [],
        loading: false,
        error: false
    },
    students: {
        data: [],
        loading: false,
        error: false
    },
    groups: {
        data: [],
        loading: false,
        error: false,
    },
    createGroup :{
        loading: false,
        error: false,
    },
    currentGroup: {
        data: {},
        loading: false,
        error: false,
    },
    alert: {
        data: {
            message: "",
            type: false,
            hasAlert: false
        },
        error: false,
        loading: false
    },
    currentGroupMedia :{
        data: [],
        loading: false,
        error: false,
    }
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
            state.user.data = payload.data
            state.user.loading = false;
            state.user.error = false
        },

        userLoginError(state) {
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
        setUserData(state, { payload }) {
            state.user.data = payload;
            state.user.loading = false;
            state.user.error = false;
        },

        loadProblemStatements(state) {
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
            state.dashboardData.data = payload
            state.dashboardData.loading = false;
            state.dashboardData.error = false
        },

        dashboardDataLoadingError(state) {
            state.dashboardData.loading = true;
            state.dashboardData.error = true
        },

        loadStudents(state) {
            state.students.loading = true;
            state.students.error = false
        },

        studentsLoaded(state, { payload }) {
            
            state.students.data = payload
            state.students.loading = false;
            state.students.error = false
        },

        studentsLoadingError(state) {
            state.students.loading = true;
            state.students.error = true
        },

        loadGroups(state) {
            state.groups.loading = true;
            state.groups.error = false
        },

        groupsLoaded(state, { payload }) {
            state.groups.data = payload
            state.groups.loading = false;
            state.groups.error = false
        },

        groupsLoadingError(state) {
            state.groups.loading = true;
            state.groups.error = true
        },

        saveGroup(state) {
            state.createGroup.loading = true;
            state.createGroup.error = false
        },
        saveGroupLoaded(state){
            state.createGroup.loading = false;
            state.createGroup.error = false
        },
        saveGroupError (state) {
            state.createGroup.loading = false;
            state.createGroup.error = true
        },

        loadCurrentGroup(state) {
            state.currentGroup.loading = true;
            state.currentGroup.error = false
        },

        currentGroupLoaded(state, { payload }) {
            state.currentGroup.data = payload
            state.currentGroup.loading = false;
            state.currentGroup.error = false
        },

        currentGroupLoadingError(state) {
            state.currentGroup.loading = true;
            state.currentGroup.error = true
        },
        createAlert(state) {
            state.alert.loading = true;
            state.alert.error = false
        },

        createAlertLoadingError(state) {
            state.alert.loading = true;
            state.alert.error = true
        },
        createAlertLoaded(state, { payload }) {
            state.alert.data = payload;
            state.alert.error = false;
            state.alert.loading = false;
        },
        loadCurrentGroupMedia(state) {
            state.currentGroupMedia.loading = true;
            state.currentGroupMedia.error = false
        },

        currentGroupMediaLoaded(state, { payload }) {
            state.currentGroupMedia.data = payload
            state.currentGroupMedia.loading = false;
            state.currentGroupMedia.error = false
        },

        currentGroupMediaLoadingError(state) {
            state.currentGroupMedia.loading = true;
            state.currentGroupMedia.error = true
        },

        // templates
        uploadTemplate (state){
            state.uploadTemplate.error= false;
            state.uploadTemplate.saving= true
        },
        templateUploaded (state){
         state.uploadTemplate.saving= false
        },
        templateUploadingError(state){
         state.uploadTemplate.error= true;
         state.uploadTemplate.saving= false
        },


        // all templates
        loadTemplates(state) {
            state.templates.loading = true;
            state.templates.error = false
        },

        templatesLoaded(state, { payload }) {
            state.templates.data = payload
            state.templates.loading = false;
            state.templates.error = false
        },

        templatesLoadingError(state) {
            state.templates.loading = true;
            state.templates.error = true
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
    problemStatementsLoadingErrorAll,
    studentsLoaded,
    studentsLoadingError,
    loadStudents,
    loadGroups,
    groupsLoaded,
    groupsLoadingError,
    saveGroup,
    saveGroupError,
    saveGroupLoaded,
    currentGroupLoaded,
    loadCurrentGroup,
    currentGroupLoadingError,
    createAlert,
    createAlertLoaded,
    createAlertLoadingError,
    loadCurrentGroupMedia,
    currentGroupMediaLoaded,
    currentGroupMediaLoadingError,
    uploadTemplate,
    templateUploaded,
    templateUploadingError,
    loadTemplates,
    templatesLoaded,
    templatesLoadingError
} = loginSlice.actions

export default loginSlice.reducer;