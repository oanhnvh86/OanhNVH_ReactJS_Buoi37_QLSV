//!B1: SET UP ROOT REDUCER

// import redux
import { combineReducers, createStore } from 'redux';

//import child reducer
import QLSVReducer from './QLSVReducer';

//create rootReducer: contain multi child reducer
const rootReducer = combineReducers({
    //Nơi sẽ chứa các reducer cho nghiệp vụ (store con)
    QLSVReducer , //QLSVReducer: QLSVReducer
})

//create and return store output from rootReducer
export const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



