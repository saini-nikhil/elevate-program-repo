import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    employee: employeeReducer,
    auth: authReducer
});

export default rootReducer;
