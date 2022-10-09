/**@module registerUserReducer */

const initialState = {
	message: '',
	success: false,
};

/**
 * Reducer for user registration component
 * @param {*} state Initial state
 * @param {*} action Action which triggers the reducer execution
 * @returns {Object} Updated state
 */
const registerUserReducer = (state = initialState, action) => {
	switch (action.type) {
		// Success case
		case 'SUBMITREGISTER': {
			return {
				...state,
				success: true,
				message: action.payload.message
			};
		}
		// Failure case
		case 'REGISTERFAILURE': {
			return {
				...state,
				success: false,
				message: action.payload.message
			};
		}
		default: return state;
	}
};
export default registerUserReducer;
