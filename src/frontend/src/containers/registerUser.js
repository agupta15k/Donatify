/**@module registerUserContainer */

import { connect } from 'react-redux';
import RegisterUser from '../components/register';
import registerUserApi from '../API/registerUser';

/**
 * Map actions to props for login component
 * @returns {Object} Register user request action that triggers register API
 */
const mapDispatchToProps = dispatch => {
	return {
		onSubmitRegister: async (value) => {
			try {
				let res = await registerUserApi(value);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITREGISTER' : 'REGISTERFAILURE',
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
 * @returns {Object} Props
 */
const mapStateToProps = state => ({
	apiStatus: state.registerReducer.success,
	apiMessage: state.registerReducer.message
});

/**
 * Using connect, subscribe login component to redux store
 */
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
