import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../request';
import { API_ENDPOINT } from '../../constants';
import {
    videoUploaded,
    uploadVideo
} from './slice';


export function* postVideo({ payload }) {
    console.log(payload,'dada')
    const {file,group,project,tags,decription } = payload;
    let formData = new FormData()
    formData.append('file', file)
    formData.append('group', group)
    const requestUrl = `${API_ENDPOINT}/video`

    try{
        const options = {
            mode: 'cors',
            method : "POST",
            body : formData
        }
        const response =yield call(request, requestUrl, options)
        console.log(response,response)
        
        if(response.success){
            yield put(videoUploaded());
        }
    }
    catch(err){

    }
}

export default function* videosPageWatcher() {
    // yield takeLatest(loadUserLogin.type, getLoginInfo),
    yield takeLatest(uploadVideo.type, postVideo);

}