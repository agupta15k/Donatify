import { connect } from "react-redux";
import LoginUser from '../components/login';
import onSubmitLoginAPI from '../API/login';

const mapDispatchToProps = dispatch => {
    return {
        onSubmitLogin: async (value) => {
            try {
                let res = await onSubmitLoginAPI(value)
                console.log('akagutest', res);
                if (res.status === 200) {
                    dispatch({
                        type: "SUBMITLOGIN",
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
    user_id: state.loginReducer.user_id,
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);
