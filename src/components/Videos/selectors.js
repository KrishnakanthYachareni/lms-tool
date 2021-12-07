import { createSelector } from "reselect";
import initialState from './slice'

const selectVideoManager = state => state.videos || initialState



const selectUploadingError = createSelector(
    [selectVideoManager],
    videoManagerState => videoManagerState.uploadVideo.error
)


export {selectUploadingError}