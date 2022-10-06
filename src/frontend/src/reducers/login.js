const initialState = {
    userId: '',
    message: '',
    success: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SUBMITLOGIN": {
            if (action.payload && action.payload.data) {
                const userId = action.payload.data.ID
                localStorage.setItem("userId", JSON.stringify({userId, authorizationTime: new Date()}));
                return {
                    ...state,
                    userId,
                    success: true,
                    message: action.payload.message
                }
            }
            return {
                ...state,
                success: false,
                message: action.payload.message
            }
        }
        case "LOGINFAILURE": {
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
