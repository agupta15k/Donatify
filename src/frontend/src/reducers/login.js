const initialState = {
    user_id: '',
    localStorageData: '',
    success: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USERNAMECHANGE": {
            state.userName = action.payload
            return {
                ...state,
            }
        }

        case "SETUSERNAME": {
            // console.log(action.payload);
            console.log("login reducer set user name  :  " + action.payload)
            state.userName = action.payload;
            return {
                ...state,
            }
        }

        case "PASSWORDCHANGE": {
            state.password = action.payload
            return {
                ...state,
            }
        }
        case "SUBMITLOGIN": {
            console.log(action)
            if (action.payload)
                localStorage.setItem("user_id", action.payload.user_id);
            return {
                ...state,
                user_id: action.payload.user_id,
                success: action.payload.success,
            }
        }
        default: return state;
    }
}
export default reducer;
