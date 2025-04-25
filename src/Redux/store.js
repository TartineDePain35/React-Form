import { configureStore, compose, applyMiddleware } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';
import rootReducer from './combineReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore(
    {reducer:rootReducer},
     composeEnhancers(applyMiddleware(thunk))
);

export default store;