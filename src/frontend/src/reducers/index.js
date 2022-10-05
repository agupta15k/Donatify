import { combineReducers } from 'redux';
import loginReducer from './login';
import home from './home'
export default combineReducers({
    home,
    loginReducer
})
