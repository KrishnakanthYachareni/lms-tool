import { useInjectReducer,useInjectSaga } from "redux-injectors";
import saga from './sagas'
import reducer from './slice'
import VideoReducer from '../Videos/slice'
import VideoSagas from '../Videos/sagas'
import PresentationReducer from "../Presentations/slice";
import PresentationSaga from "../Presentations/sagas";
import ProblemStatementReducer from "../ProblemStatements/slice";
import ProblemStatementSaga from "../ProblemStatements/sagas";
function AppManager(){
    useInjectReducer({key: 'appManager', reducer: reducer})
    useInjectSaga({key:"appManager", saga: saga})

    useInjectReducer({key: 'videos', reducer: VideoReducer})
    useInjectSaga({key:"videos", saga: VideoSagas})

    useInjectReducer({key: 'presentations', reducer: PresentationReducer})
    useInjectSaga({key:"presentations", saga: PresentationSaga})

    useInjectReducer({key: 'problemstatements', reducer: ProblemStatementReducer})
    useInjectSaga({key:"problemstatements", saga: ProblemStatementSaga})

    return null;
}

export default AppManager;              