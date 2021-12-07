import { call, put, takeLatest } from 'redux-saga/effects';
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
    dashboardDataLoaded
} from './slice';


export function* registerUser({ payload }) {
    const { firstName,lastName,email, password, userType } = payload;
    console.log(password,userType,'dadada')
    const requestUrl = `${API_ENDPOINT}/signup`

    try{
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method : "POST",
            body :JSON.stringify({
                firstName,
                lastName,
                password,
                userType,
                email
            })
        }
        const response =yield call(request, requestUrl, options)
        console.log(response,response)
        
        if(response.success){
            yield put(userLoginLoaded(response.data));
        }
    }
    catch(err){
        yield put(userLoginError());

    }
}

export function* checkUserLogin({ payload }) {
    const {email, password, userType } = payload;
    console.log(password,userType,'123cacaa4')
    const requestUrl = `${API_ENDPOINT}/login`

    try{
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method : "POST",
            body :JSON.stringify({
                password,
                userType,
                email
            })
        }
        const response =yield call(request, requestUrl, options)
        console.log(response,response)
        
        if(response.success){
            yield put(userLoginLoaded(response.data));
        }
    }
    catch(err){
        yield put(userLoginError());

    }
}


export function* getproblemStatements({ payload }) {
   
    const requestUrl = `${API_ENDPOINT}/problemStatement`

    try{
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method : "GET"
        }
        const response =yield call(request, requestUrl, options)
        
        if(response){
            yield put(problemStatementsLoaded(response));
        }
    }
    catch(err){
        yield put(problemStatementsLoadingError());

    }
}

export function* getTags() {
   
    const requestUrl = `${API_ENDPOINT}/tag`

    try{
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method : "GET"
        }
        const response =yield call(request, requestUrl, options)
        
        if(response){
            yield put(tagsLoaded(response));
        }
    }
    catch(err){
        yield put(tagsLoadingError());

    }
}

export function* getDashboardData({payload}) {
    console.log('loading')
    const requestUrl = `${API_ENDPOINT}/media/search`

    try{
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method : "POST",

            body :JSON.stringify({
                search: payload.search
            })
          
        }
        const response =yield call(request, requestUrl, options)
        
        if(response){
            yield put(dashboardDataLoaded(response));
        }
    }
    catch(err){
        yield put(dashboardDataLoadingError());

    }
}

export default function* loginPageWatcher() {
    yield takeLatest(loadDashboardData.type, getDashboardData);

    yield takeLatest(saveUserSignup.type, registerUser);
    yield takeLatest(loadUserLogin.type, checkUserLogin);
    yield takeLatest(loadProblemStatements.type, getproblemStatements);
    yield takeLatest(loadTags.type, getTags);

}