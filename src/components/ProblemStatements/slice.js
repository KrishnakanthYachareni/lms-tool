import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    problemStatement: {
        saving: false,
        error: false
    }
}

const problemStatementSlice = createSlice({
    name: "problemStatements",
    initialState,
    reducers: {
       uploadProblemStatement (state){
           state.problemStatement.error= false;
           state.problemStatement.saving= true
       },
       problemStatementUploaded (state){
        state.problemStatement.saving= false
       },
       problemStatementUploadingError(state){
        state.problemStatement.error= true;
        state.problemStatement.saving= false
       }
       
    }
})

export const {
    uploadProblemStatement,
    problemStatementUploaded,
    problemStatementUploadingError
} = problemStatementSlice.actions

export default problemStatementSlice.reducer;