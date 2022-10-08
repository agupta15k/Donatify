import homeReducer from '../../reducers/home';

describe('homeReducer', () => {
    it('submit item success action', () => {
        const action = {
            type: 'SUBMITITEM',
            payload: {
                status: 200,
                message: 'success',
                data: {}
            }
        };
        const expectedOutput = {
            success: true,
            message: 'success'
        };
        expect(homeReducer({}, action)).toEqual(expectedOutput);
    });

    it('submit item failure action', () => {
        const action = {
            type: 'ITEMADDFAILURE',
            payload: {
                status: 400,
                message: 'failure',
                data: {}
            }
        };
        const expectedOutput = {
            success: false,
            message: 'failure'
        };
        expect(homeReducer({}, action)).toEqual(expectedOutput);
    });

    it('submit item default action', () => {
        const action = {
            type: 'test',
            payload: {}
        };
        const expectedOutput = {};
        expect(homeReducer({}, action)).toEqual(expectedOutput);
    });
});
