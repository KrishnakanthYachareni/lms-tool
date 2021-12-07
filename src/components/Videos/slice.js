import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    uploadVideo: {
        saving: false,
        error: false
    }
}

const loginSlice = createSlice({
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
       }
    }
})

export const {
    uploadVideo,
    videoUploaded
} = loginSlice.actions

export const {reducer} =  loginSlice;