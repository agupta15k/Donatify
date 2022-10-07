const initialState = {
    message: '',
    success: false
    // user_id: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SUBMITITEM": {
            return {
                ...state,
                success: true,
                message: action.payload.message
            }
        }
        case "ITEMADDFAILURE": {
            return {
                ...state,
                success: false,
                message: action.payload.message
            }
        }
        default: return state;
    }
}
export default reducer;
