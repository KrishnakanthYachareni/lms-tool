import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from '../../request';
import { API_ENDPOINT } from '../../constants';

import {
    loadUserLogin,
    userLoginLoaded,
    userLoginError,
    saveUserSignup,
    problemStatementsLoaded,
    problemStatementsLoadingError,
    loadProblemStatements,
    loadTags,
    tagsLoaded,
    tagsLoadingError,
    dashboardDataLoadingError,
    loadDashboardData,
    dashboardDataLoaded,
    loadProblemStatementsAll,
    problemStatementsLoadedAll,
    loadStudents,
    studentsLoaded,
    studentsLoadingError,
    groupsLoaded,
    groupsLoadingError,
    loadGroups,
    saveGroup,
    saveGroupError,
    saveGroupLoaded,
    loadCurrentGroup,
    currentGroupLoaded,
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
    templatesLoaded,
    templatesLoadingError,
    loadTemplates
} from './slice';


export function* registerUser({ payload }) {
    const { firstName, lastName, email, password, userType } = payload;
    const requestUrl = `${API_ENDPOINT}/signup`

    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                firstName,
                lastName,
                password,
                userType,
                email
            })
        }
        const response = yield call(request, requestUrl, options)

        if (response.success) {
            yield put(userLoginLoaded(response));
        }
    }
    catch (err) {
        yield put(userLoginError());

    }
}

export function* checkUserLogin({ payload }) {
    const { email, password, userType } = payload;
    const requestUrl = `${API_ENDPOINT}/login`

    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                password,
                userType,
                email
            })
        }
        const response = yield call(request, requestUrl, options)
        if (response.success) {
            yield put(userLoginLoaded(response));
        }
        else {
            yield put(userLoginError(response))
        }

    }
    catch (err) {
        yield put(userLoginError());

    }
}


export function* getproblemStatements() {

    const requestUrl = `${API_ENDPOINT}/problemStatement/`

    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "GET"
        }
        const response = yield call(request, requestUrl, options)

        if (response) {
            yield put(problemStatementsLoaded(response));
        }
    }
    catch (err) {
        yield put(problemStatementsLoadingError());

    }
}


export function* getproblemStatementsAll({ payload }) {

    const requestUrl = `${API_ENDPOINT}/problemStatement/all`

    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "GET"
        }
        const response = yield call(request, requestUrl, options)

        if (response) {
            yield put(problemStatementsLoadedAll(response));
        }
    }
    catch (err) {
        yield put(problemStatementsLoadingError());

    }
}

export function* getTags() {

    const requestUrl = `${API_ENDPOINT}/tag`

    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "GET"
        }
        const response = yield call(request, requestUrl, options)

        if (response) {
            yield put(tagsLoaded(response));
        }
    }
    catch (err) {
        yield put(tagsLoadingError());

    }
}

export function* getDashboardData({ payload }) {
    const requestUrl = `${API_ENDPOINT}/media/search`

    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "POST",

            body: JSON.stringify({
                search: payload.search
            })

        }
        const response = yield call(request, requestUrl, options)

        if (response) {
            yield put(dashboardDataLoaded(response));
        }
    }
    catch (err) {
        yield put(dashboardDataLoadingError());

    }
}


export function* getStudents() {
    const requestUrl = `${API_ENDPOINT}/students`

    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "GET",
        }
        const response = yield call(request, requestUrl, options)

        if (response) {
            yield put(studentsLoaded(response));
        }
    }
    catch (err) {
        yield put(studentsLoadingError());

    }
}


export function* getGroups() {
    const requestUrl = `${API_ENDPOINT}/group`
    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "GET",
        }
        const response = yield call(request, requestUrl, options)
        if (response) {
            yield put(groupsLoaded(response));
        }
    }
    catch (err) {
        yield put(groupsLoadingError());

    }
}


export function* createGroup({ payload }) {
    const { name, year, term, teamMembers, problemStatement } = payload;
    const requestUrl = `${API_ENDPOINT}/group`
    console.log(payload)
    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                name,
                year,
                term,
                teamMembers,
                problemStatement
            })
        }
        const response = yield call(request, requestUrl, options)

        if (response) {
            yield all([
                put(createAlert(
                    { message: 'Group Created Successfully', hasAlert: true, type: 'success' }
                )),
                , put(saveGroupLoaded(response))
                , put(createAlert(
                    { message: '', hasAlert: false, type: 'success' }
                )),
            
            ])
        }
    }
    catch (err) {
        yield put(saveGroupError());

    }
}


export function* getCurrentGroup({ payload }) {
    const { id } = payload
    const requestUrl = `${API_ENDPOINT}/group/${id}/`

    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "GET",
        }
        const response = yield call(request, requestUrl, options)

        if (response) {
            yield put(currentGroupLoaded(response));
        }
    }
    catch (err) {
        yield put(currentGroupLoadingError());

    }
}

export function* createAlertMessage({ payload }) {
    try {
        yield put(createAlertLoaded(payload));
    }
    catch (err) {
        yield put(createAlertLoadingError());

    }
}

export function* getCurrentGroupMedia({ payload }) {
    const { id } = payload;
    const requestUrl = `${API_ENDPOINT}/media/group/`

    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                id
            })
        }
        const response = yield call(request, requestUrl, options)

        if (response) {
            yield put(currentGroupMediaLoaded(response));
        }
    }
    catch (err) {
        yield put(currentGroupMediaLoadingError());

    }
}



export function* postTemplate({ payload }) {
    const { file, year, createdBy, tags, description, title } = payload;
    let formData = new FormData()

    formData.append('title', title)
    formData.append('year', year)
    formData.append('tags', tags)
    formData.append('description', description)
    formData.append('createdBy', createdBy)
    if (file && file.length > 0) {

        for (let i = 0; i < file.length; i++) {
            formData.append("m", file[i]);
        }
    }
    const requestUrl = `${API_ENDPOINT}/template`

    try {
        const options = {
            mode: 'cors',
            method: "POST",
            body: formData
        }
        const response = yield call(request, requestUrl, options)

        yield all([
            put(createAlert(
                { message: 'Template Created Successfully', hasAlert: true, type: 'success' }
            )),
            
             put(templateUploaded()),
            put(createAlert(
                { message: '', hasAlert: false, type: 'success' }
            )),
        ]);

    }
    catch (err) {
        yield all([
            put(createAlert(
                { message: 'Template Created Successfully', hasAlert: true, type: 'success' }
            )),
             put(templateUploaded()),
            put(createAlert(
                { message: '', hasAlert: false, type: 'success' }
            )),])
    }
}


export function* getTemplates() {

    const requestUrl = `${API_ENDPOINT}/template/`

    try {
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method: "GET"
        }
        const response = yield call(request, requestUrl, options)

        if (response) {
            yield put(templatesLoaded(response));
        }
    }
    catch (err) {
        yield put(templatesLoadingError());

    }
}


export default function* loginPageWatcher() {
    yield takeLatest(loadDashboardData.type, getDashboardData);
    yield takeLatest(saveUserSignup.type, registerUser);
    yield takeLatest(loadUserLogin.type, checkUserLogin);
    yield takeLatest(loadProblemStatements.type, getproblemStatements);
    yield takeLatest(loadTags.type, getTags);
    yield takeLatest(loadProblemStatementsAll.type, getproblemStatementsAll);
    yield takeLatest(loadStudents.type, getStudents);
    yield takeLatest(loadGroups.type, getGroups);
    yield takeLatest(saveGroup.type, createGroup);
    yield takeLatest(loadCurrentGroup.type, getCurrentGroup);
    yield takeLatest(createAlert.type, createAlertMessage);
    yield takeLatest(loadCurrentGroupMedia.type, getCurrentGroupMedia);
    yield takeLatest(uploadTemplate.type, postTemplate);
    yield takeLatest(loadTemplates.type, getTemplates);

}