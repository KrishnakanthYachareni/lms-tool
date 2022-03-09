import { createSelector } from "reselect";
import initialState from './slice'

const selectProblemStatementManager = state => state.problemStatementManager || initialState

const selectUploadingError = createSelector(
    [selectProblemStatementManager],
    problemStatementManagerState => problemStatementManagerState.problemStatement
)


export {selectUploadingError}