import { createSelector } from "reselect";
import initialState from './slice'

const selectProblemStatementManager = state => state.problemStatementsManager || initialState


console.group(selectProblemStatementManager)
const selectUploadingError = createSelector(
    [selectProblemStatementManager],
    problemStatementsManager => problemStatementsManager.problemStatement
)


export {selectUploadingError}