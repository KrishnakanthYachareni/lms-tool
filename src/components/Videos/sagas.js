import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../request';
import { API_ENDPOINT } from '../../constants';
import {
    videoUploaded,
    uploadVideo
} from './slice';


export function* postVideo({ payload }) {
    console.log(payload, 'dada')
    const { file, group, tags, description } = payload;
    let formData = new FormData()

    formData.append('group', group)
    formData.append('tags', tags)
    formData.append('description', description)
    formData.append('mediaType', 'video')
    formData.append('file', file)
    const requestUrl = `${API_ENDPOINT}/media`

    try {
        const options = {
            mode: 'cors',
            method: "POST",
            body: formData
        }
        const response = yield call(request, requestUrl, options)
        console.log(response, response)

        if (response.success) {
            yield put(videoUploaded());
        }
    }
    catch (err) {

    }
}

export default function* videosPageWatcher() {
    yield takeLatest(uploadVideo.type, postVideo);

}