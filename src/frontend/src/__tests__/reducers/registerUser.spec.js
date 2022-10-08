import registerUserReducer from '../../reducers/registerUser';

describe('registerUserReducer', () => {
    it('submit item success action', () => {
        const action = {
            type: 'SUBMITREGISTER',
            payload: {
                status: 200,
                message: 'success'
            }
        };
        const expectedOutput = {
            success: true,
            message: 'success'
        };
        expect(registerUserReducer({}, action)).toEqual(expectedOutput);
    });

    it('submit item failure action', () => {
        const action = {
            type: 'REGISTERFAILURE',
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
        expect(registerUserReducer({}, action)).toEqual(expectedOutput);
    });

    it('submit item default action', () => {
        const action = {
            type: 'test',
            payload: {}
        };
        const expectedOutput = {};
        expect(registerUserReducer({}, action)).toEqual(expectedOutput);
    });
});
