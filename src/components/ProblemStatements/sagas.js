import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from '../../request';
import { API_ENDPOINT } from '../../constants';
import {
    problemStatementUploaded,
    uploadProblemStatement
} from './slice';
import { createAlert } from '../AppManager/slice';


export function* postProblemStatement({ payload }) {
    console.log(payload, 'dada')
    const { file, year, createdBy, tags, description, title } = payload;
    let formData = new FormData()

    formData.append('title', title)
    formData.append('year', year)
    formData.append('tags', tags)
    formData.append('description', description)
    formData.append('createdBy', createdBy)
    // formData.append('multipleFiles', file)
    if (file && file.length > 0) {

        for (let i = 0; i < file.length; i++) {
            formData.append("m", file[i]);
        }
    }
    const requestUrl = `${API_ENDPOINT}/problemStatement`

    try {
        const options = {
            mode: 'cors',
            method: "POST",
            body: formData
        }
        const response = yield call(request, requestUrl, options)
        console.log(response, response)

        if (response) {
            yield all([
                put(createAlert(
                    { message: 'Problem Statement Created Successfully', hasAlert: true, type: 'success' }
                )),
                yield put(problemStatementUploaded())]);
        }
    }
    catch (err) {

    }
}


export default function* problemStatementsPageWatcher() {
    // yield takeLatest(loadUserLogin.type, getLoginInfo),
    yield takeLatest(uploadProblemStatement.type, postProblemStatement);

}