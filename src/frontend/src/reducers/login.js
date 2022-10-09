/**@module loginReducer */

const initialState = {
	userId: '',
	message: '',
	success: false,
};

/**
 * Reducer for login component
 * @param {*} state Initial state
 * @param {*} action Action which triggers the reducer execution
 * @returns {Object} Updated state
 */
const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		// Success case
		case 'SUBMITLOGIN': {
			if (action.payload && action.payload.data) {
				const userId = action.payload.data.ID;
				localStorage.setItem('userLogonDetails', JSON.stringify({userId, signInTime: new Date(), signInStatus: true}));
				return {
					...state,
					userId,
					success: true,
					message: action.payload.message
				};
			}
			return {
				...state,
				success: false,
				message: action.payload.message
			};
		}
		// Failure case
		case 'LOGINFAILURE': {
			return {
				...state,
				success: false,
				message: action.payload.message
			};
		}
		default: return state;
	}
};
export default loginReducer;
