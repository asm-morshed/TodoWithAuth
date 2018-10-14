import { combineReducers } from 'redux';
import profileReducer from './profileReducer'
import authReducer from './authReducer'
import todoReducer from './todoReducer';


export default combineReducers({
    profile: profileReducer,
    auth: authReducer,
    todos: todoReducer
})