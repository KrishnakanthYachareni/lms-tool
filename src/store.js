
// import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'connected-react-router';
// import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
// import createSagaMiddleware from 'redux-saga';
// import createReducer from './reducers';

// export default function configureAppStore(
//   initialState,
//   history,
// ) {
//   let composeEnhancers = compose;

//   const reduxSagaMonitorOptions = {};
//   const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
//   const { run: runSaga } = sagaMiddleware;

//   const middlewares = [sagaMiddleware, routerMiddleware(history)];
//   if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
//     /* eslint-disable no-underscore-dangle */
//     if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
//       composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
//   }
//   const enhancers = [
//     applyMiddleware(...middlewares),
//     createInjectorsEnhancer({
//       createReducer,
//       runSaga,
//     }),
//   ];

//   const store = createStore(
//     createReducer(),
//     initialState,
//     composeEnhancers(...enhancers),
//   );


//   if (module.hot) {
//     module.hot.accept('./reducers', () => {
//       forceReducerReload(store);
//     });
//   }

//   return store;

// };
// import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'connected-react-router';
// import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
// import createSagaMiddleware from 'redux-saga';
// import createReducer from './reducers';

// export default function configureStore(initialState = {}, history) {
//   let composeEnhancers = compose;
//   const reduxSagaMonitorOptions = {};

//   // If Redux Dev Tools is installed, enable it
//   /* istanbul ignore next */
//   if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
//     /* eslint-disable no-underscore-dangle */
//     if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
//       composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
//   }

//   const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
//   const { run: runSaga } = sagaMiddleware;

//   // Create the store with two middlewares
//   // 1. sagaMiddleware: Makes redux-sagas work
//   // 2. routerMiddleware: Syncs the location/URL path to the state
//   const middlewares = [sagaMiddleware, routerMiddleware(history)];

//   const enhancers = [
//     applyMiddleware(...middlewares),
//     createInjectorsEnhancer({
//       createReducer,
//       runSaga,
//     }),
//   ];

//   const store = configureStore({
//     reducer: createReducer(),
//     middleware: [...getDefaultMiddleware(), ...middlewares],
//     preloadedState: initialState,
//     devTools: process.env.NODE_ENV !== 'production',
//     enhancers,
//   });

//   // Make reducers hot reloadable, see http://mxs.is/googmo
//   /* istanbul ignore next */
//   if (module.hot) {
//     module.hot.accept('./reducers', () => {
//       forceReducerReload(store);
//     });
//   }

//   return store;
// }

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

export default function configureAppStore(initialState = {}) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // sagaMiddleware: Makes redux-sagas work
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,  
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [...getDefaultMiddleware({serializableCheck: false}), ...middlewares],
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return store;
}


