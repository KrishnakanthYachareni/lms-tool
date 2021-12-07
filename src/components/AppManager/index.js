import { useInjectReducer,useInjectSaga } from "redux-injectors";
import saga from './sagas'
import reducer from './slice'
import VideoReducer from '../Videos/slice'
import VideoSagas from '../Videos/sagas'

function AppManager(){
    useInjectReducer({key: 'appManager', reducer: reducer})
    useInjectSaga({key:"appManager", saga: saga})

    useInjectReducer({key: 'videos', reducer: VideoReducer})
    useInjectSaga({key:"videos", saga: VideoSagas})

    return null;
}

export default AppManager;              