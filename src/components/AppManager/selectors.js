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

const selectStudents = createSelector(
    [selectappManager],
    appManagerState => appManagerState.students.data
)

const selectGroups = createSelector(
    [selectappManager],
    appManagerState => appManagerState.groups.data
)

const selectCurrentGroup = createSelector(
    [selectappManager],
    appManagerState => appManagerState.currentGroup.data
)

const selectCreateGroup = createSelector(
    [selectappManager],
    appManagerState => appManagerState.createGroup
)


const selectAlert = createSelector(
    [selectappManager],
    appManagerState => appManagerState.alert.data
)

const selectCurrentGroupMedia = createSelector(
    [selectappManager],
    appManagerState => appManagerState.currentGroupMedia.data
)

const selectTemplates = createSelector(
    [selectappManager],
    appManagerState => appManagerState.templates.data
)


const selectTemplateUploadingError = createSelector(
    [selectappManager],
    appManagerState => appManagerState.uploadTemplate
)

export { 
    selectUserInfo, 
    selectProblemStatements, 
    selectTags, 
    selectDashboardData, 
    selectUserInfoError, 
    selectProblemStatementsAll, 
    selectStudents,
    selectGroups,
    selectCurrentGroup,
    selectCreateGroup,
    selectAlert,
    selectCurrentGroupMedia,
    selectTemplates,
    selectTemplateUploadingError
}