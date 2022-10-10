/**@module loginContainer */

import { connect } from 'react-redux';
import LoginUser from '../components/login';
import onSubmitLoginAPI from '../API/login';

/**
 * Map actions to props for login component
 * @returns  {Object} Submit login request action that triggers login API
 */
const loginMapDispatchToProps = dispatch => {
	return {
		onSubmitLogin: async (value) => {
			try {
				let res = await onSubmitLoginAPI(value);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITLOGIN' : 'LOGINFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		}
	};
};

/**
 * Map state to props for login component
 * @returns  {Object} Props
 */
const loginMapStateToProps = state => ({
	userId: '',
	apiStatus: state.loginReducer.success,
	apiMessage: state.loginReducer.message
});

/**
 * Using connect, subscribe login component to redux store
 */
export default connect(loginMapStateToProps, loginMapDispatchToProps)(LoginUser);
