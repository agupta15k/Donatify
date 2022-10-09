/**@module combineReducers */

import { combineReducers } from 'redux';
import loginReducer from './login';
import registerReducer from './registerUser';
import home from './home';

/**
 * Combine all reducers
 */
export default combineReducers({
	loginReducer,
	home,
	registerReducer
});
