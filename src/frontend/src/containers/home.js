/**@module homeContainer */

import { connect } from 'react-redux';
import Home from '../components/home';
import addItemApi from '../API/addItem';

/**
 * Map actions to props for user dashboard component
 * @returns  {Object} Item addition action that triggers addItem API
 */
const homeMapDispatchToProps = dispatch => {
	return {
		onAddItem: async (value) => {
			try {
				let res = await addItemApi(value);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITITEM' : 'ITEMADDFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		}
	};
};

/**
 * Map state to props for user dashboard component
 * @returns  {Object} Props
 */
const homeMapStateToProps = state => ({
	apiStatus: state.home.success,
	apiMessage: state.home.message,
	userId: JSON.parse(localStorage.getItem('userLogonDetails')).userId
});

/**
 * Using connect, subscribe user dashboard component to redux store
 */
export default connect(homeMapStateToProps, homeMapDispatchToProps)(Home);
