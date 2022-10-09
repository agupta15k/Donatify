import loginReducer from '../../reducers/login';

describe('loginReducer', () => {
	it('submit item success action - action payload', () => {
		const action = {
			type: 'SUBMITLOGIN',
			payload: {
				status: 200,
				message: 'success',
				data: {
					ID: 1
				}
			}
		};
		const expectedOutput = {
			userId: 1,
			success: true,
			message: 'success'
		};
		expect(loginReducer({}, action)).toEqual(expectedOutput);
	});

	it('submit item success action - no action payload', () => {
		const action = {
			type: 'SUBMITLOGIN',
			payload: {
				status: 200,
				message: 'failure'
			}
		};
		const expectedOutput = {
			success: false,
			message: 'failure'
		};
		expect(loginReducer({}, action)).toEqual(expectedOutput);
	});

	it('submit item failure action', () => {
		const action = {
			type: 'LOGINFAILURE',
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
		expect(loginReducer({}, action)).toEqual(expectedOutput);
	});

	it('submit item default action', () => {
		const action = {
			type: 'test',
			payload: {}
		};
		const expectedOutput = {};
		expect(loginReducer({}, action)).toEqual(expectedOutput);
	});
});
