import { connect } from "react-redux";
import RegisterUser from '../components/register';
import registerUserApi from '../API/registerUser';

const mapDispatchToProps = dispatch => {
    return {
        onSubmitRegister: async (value) => {
            try {
                let res = await registerUserApi(value)
                if (res.status === 200) {
                    dispatch({
                        type: "SUBMITREGISTER",
                        payload: res
                    })
                }
            } catch (error) {
                console.error('Some error occurred while calling axios API', error)
            }
        }
    }
}

const mapStateToProps = state => ({
    user_id: state.registerReducer.user_id,
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
