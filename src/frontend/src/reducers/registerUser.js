const initialState = {
	message: '',
	success: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SUBMITREGISTER': {
			return {
				...state,
				success: true,
				message: action.payload.message
			};
		}
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
export default reducer;
