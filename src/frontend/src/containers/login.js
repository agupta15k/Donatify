import { connect } from "react-redux";
import LoginUser from '../components/login';
import onSubmitLoginAPI from '../API/login';

const mapDispatchToProps = dispatch => {
    return {
        onSubmitLogin: async (value) => {
            try {
                let res = await onSubmitLoginAPI(value)
                dispatch({
                    type: res && res.status === 200 ? 'SUBMITLOGIN' : 'LOGINFAILURE',
                    payload: res.data
                });
            } catch (error) {
                console.error('Some error occurred while calling axios API', error)
            }
        }
    }
}

const mapStateToProps = state => ({
    userId: state.loginReducer.userId,
    apiStatus: state.loginReducer.success,
    apiMessage: state.loginReducer.message
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);
