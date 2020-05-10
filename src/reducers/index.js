import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import appReducer from './appReducer';

const rootReducers = combineReducers({
   usersList: usersReducer,
   app: appReducer
});

export default rootReducers;
