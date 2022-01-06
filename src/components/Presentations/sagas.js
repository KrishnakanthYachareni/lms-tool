import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../request';
import { API_ENDPOINT } from '../../constants';
import {
    presentationUploaded,
    uploadPresentation
} from './slice';


export function* postPresentation({ payload }) {
    console.log(payload,'dada')
    const {file,group,problemStatement,tags,description } = payload;
    let formData = new FormData()
   
    formData.append('group', "group1")
    formData.append('problemStatement', problemStatement)
    formData.append('tags', tags)
    formData.append('description', description)
    formData.append('mediaType', 'presentation')
    formData.append('file', file)
    const requestUrl = `${API_ENDPOINT}/media`

    try{
        const options = {
            mode: 'cors',
            method : "POST",
            body : formData
        }
        const response =yield call(request, requestUrl, options)
        console.log(response,response)
        
        if(response.success){
            yield put(presentationUploaded());
        }
    }
    catch(err){

    }
}

export default function* presentationsPageWatcher() {
    // yield takeLatest(loadUserLogin.type, getLoginInfo),
    yield takeLatest(uploadPresentation.type, postPresentation);

}