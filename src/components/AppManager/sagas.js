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
    loadProblemStatements
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
   
    const requestUrl = `${API_ENDPOINT}/problemStatements`

    try{
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            },
            method : "GET"
        }
        const response =yield call(request, requestUrl, options)
        console.log(response,response)
        
        if(response.success){
            yield put(problemStatementsLoaded(response.data));
        }
    }
    catch(err){
        yield put(problemStatementsLoadingError());

    }
}
export default function* loginPageWatcher() {
    // yield takeLatest(loadUserLogin.type, getLoginInfo),
    yield takeLatest(saveUserSignup.type, registerUser);
    yield takeLatest(loadUserLogin.type, checkUserLogin);
    yield takeLatest(loadProblemStatements.type, getproblemStatements);
}