import rootReducer from '../sagas/reducer'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas/saga/index'
const reducer = combineReducers(rootReducer)
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
const logger = require('redux-logger').default
const preloadState = composeEnhancers(applyMiddleware(logger, sagaMiddleware))
const store = createStore(reducer, preloadState)
sagaMiddleware.run(mySaga)
export default store
