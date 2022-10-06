import { combineReducers } from 'redux';
import loginReducer from './login';
import registerReducer from './registerUser';
import home from './home';
export default combineReducers({
    loginReducer,
    home,
    registerReducer
})
