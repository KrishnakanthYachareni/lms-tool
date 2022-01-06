import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    uploadPresentation: {
        saving: false,
        error: false
    }
}

const presentationSlice = createSlice({
    name: "presentations",
    initialState,
    reducers: {
       uploadPresentation (state){
           console.log(state)
           state.uploadPresentation.error= false;
           state.uploadPresentation.saving= true
       },
       presentationUploaded (state){
        state.uploadPresentation.saving= false
       },
       presentationUploadingError(state){
        state.uploadPresentation.error= true;
        state.uploadPresentation.saving= false
       }
    }
})

export const {
    uploadPresentation,
    presentationUploaded,
    presentationUploadingError
} = presentationSlice.actions

export default presentationSlice.reducer;