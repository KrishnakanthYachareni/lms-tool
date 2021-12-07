import { createSelector } from "reselect";
import initialState from './slice'

const selectappManager = state => state.appManager || initialState

const selectUserInfo = createSelector(
    [selectappManager],
    appManagerState => appManagerState.user.data
)


const selectProblemStatements = createSelector(
    [selectappManager],
    appManagerState => appManagerState.problemStatements.data
)
export {selectUserInfo, selectProblemStatements}