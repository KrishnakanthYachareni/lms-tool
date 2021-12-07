import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    uploadVideo: {
        saving: false,
        error: false
    }
}

const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
       uploadVideo (state){
           console.log(state)
           state.uploadVideo.error= false;
           state.uploadVideo.saving= true
       },
       videoUploaded (state){
        state.uploadVideo.saving= false
       },
       videoUploadingError(state){
        state.uploadVideo.error= true;
        state.uploadVideo.saving= false
       }
    }
})

export const {
    uploadVideo,
    videoUploaded,
    videoUploadingError
} = videoSlice.actions

export default videoSlice.reducer;