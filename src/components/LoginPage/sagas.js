import { call, put, takeLatest } from 'redux-saga/effects';
import { API_ENDPOINT } from '../../constants';
import request from '../../request';
import {
    loadUserLogin,
    userLoginLoaded,
    userLoginError
} from './slice';

export function* getLoginInfo({ payload }) {
    const { username, password, userType } = payload;
    console.log(username,password,userType)
    const requestUrl = `${API_ENDPOINT}/login`

    try{
        const options = {
            mode: 'cors',
            headers: {
                'Content-Type': "application/json"
            }
        }
        const response =yield call(response, requestUrl, options)

        yield put(userLoginLoaded(response));
    }
    catch(err){
        yield put(userLoginError());

    }
}

export default function* loginPageWatcher() {
    yield takeLatest(loadUserLogin.type, getLoginInfo)
}