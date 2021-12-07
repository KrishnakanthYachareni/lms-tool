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

const selectTags = createSelector(
    [selectappManager],
    appManagerState => appManagerState.tags.data
)


const selectDashboardData = createSelector(
    [selectappManager],
    appManagerState => appManagerState.dashboardData.data
)


export {selectUserInfo, selectProblemStatements,selectTags,selectDashboardData}