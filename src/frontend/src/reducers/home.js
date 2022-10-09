/**@module homeReducer */

const initialState = {
	message: '',
	success: false
	// user_id: '',
};

/**
 * Reducer for user dashboard component
 * @param {*} state Initial state
 * @param {*} action Action which triggers the reducer execution
 * @returns {Object} Updated state
 */
const homeReducer = (state = initialState, action) => {
	switch (action.type) {
		// Success case
		case 'SUBMITITEM': {
			return {
				...state,
				success: true,
				message: action.payload.message
			};
		}
		// Failure case
		case 'ITEMADDFAILURE': {
			return {
				...state,
				success: false,
				message: action.payload.message
			};
		}
		default: return state;
	}
};
export default homeReducer;
