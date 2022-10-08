import { configureStore } from '@reduxjs/toolkit';
import reducer from '../../reducers/index';
import importStore from '../../app/store';


describe('reduxStore', () => {
    it('store should be set correctly', () => {
        const store = configureStore({
            reducer
        });
        expect(JSON.stringify(store)).toEqual(JSON.stringify(importStore));
    });
});
