const initialState = {
    user_id: '',
    localStorageData: '',
    success: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SUBMITLOGIN": {
            if (action.payload)
                localStorage.setItem("user_id", action.payload.data.user_id);
            return {
                ...state,
                user_id: action.payload.data.user_id,
                success: action.payload.data.status === 200
            }
        }
        default: return state;
    }
}
export default reducer;
