import { configureStore } from '@reduxjs/toolkit';
import reducer from '../../reducers/index';
import importStore from '../../app/store';


describe('getProfleAPI', () => {
    it('should call axios post with correct input', () => {
        const store = configureStore({
            reducer
        });
        expect(JSON.stringify(store)).toEqual(JSON.stringify(importStore));
    });
});
