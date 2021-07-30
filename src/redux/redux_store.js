import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";

import authReducer from "./authReduser";
import postReducer from "./postReduser";
import friendReducer from "./friendReduser";
import peopleReducer from "./peopleReduser";






let reducers = combineReducers({
    isAuthM: authReducer,
    post: postReducer,
    friends: friendReducer,
    form: formReducer,
    people: peopleReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(
    applyMiddleware(thunkMiddleware)
));
//let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;




export default store;