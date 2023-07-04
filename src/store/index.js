import rootReducer from "../sagas/reducer";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import mySaga from "../sagas/saga/index";
const reducer = combineReducers(rootReducer);
const sagaMiddleware = createSagaMiddleware();
let preloadState;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// eslint-disable-next-line global-require
const logger = require("redux-logger").default;
preloadState = composeEnhancers(applyMiddleware(logger, sagaMiddleware));
const store = createStore(reducer, preloadState);
sagaMiddleware.run(mySaga);
export default store;
