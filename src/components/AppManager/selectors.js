import { createSelector } from "reselect";
import initialState from './slice'

const selectappManager = state => state.appManager || initialState

const selectUserInfo = createSelector(
    [selectappManager],
    appManagerState => appManagerState.user.data
)


const selectUserInfoError = createSelector(
    [selectappManager],
    appManagerState => appManagerState.user.error
)

const selectProblemStatements = createSelector(
    [selectappManager],
    appManagerState => appManagerState.problemStatements.data
)

const selectProblemStatementsAll = createSelector(
    [selectappManager],
    appManagerState => appManagerState.problemStatementsAll.data
)

const selectTags = createSelector(
    [selectappManager],
    appManagerState => appManagerState.tags.data
)


const selectDashboardData = createSelector(
    [selectappManager],
    appManagerState => appManagerState.dashboardData.data
)


export {selectUserInfo, selectProblemStatements,selectTags,selectDashboardData,selectUserInfoError,selectProblemStatementsAll}