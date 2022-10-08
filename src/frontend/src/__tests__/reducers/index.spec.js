import reducers from '../../reducers/index';
import loginReducer from '../../reducers/login';
import homeReducer from '../../reducers/home';
import registerUserReducer from '../../reducers/registerUser';
import { combineReducers } from 'redux';

describe('indexReducers', () => {
    it('should match list of reducers', () => {
        const combinedReducer = combineReducers({loginReducer, homeReducer, registerUserReducer});
        expect(JSON.stringify(combineReducers)).toEqual(JSON.stringify(reducers));
    });
});
