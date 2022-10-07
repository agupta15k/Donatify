import { connect } from "react-redux";
import RegisterUser from '../components/register';
import registerUserApi from '../API/registerUser';

const mapDispatchToProps = dispatch => {
    return {
        onSubmitRegister: async (value) => {
            try {
                let res = await registerUserApi(value)
                dispatch({
                    type: res.status === 200 ? 'SUBMITREGISTER' : 'REGISTERFAILURE',
                    payload: res
                });
            } catch (error) {
                console.error('Some error occurred while calling axios API', error)
            }
        }
    }
}

const mapStateToProps = state => ({
    apiStatus: state.registerReducer.success,
    apiMessage: state.registerReducer.message
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
