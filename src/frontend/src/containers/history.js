/**@module historyContainer */

import { connect } from 'react-redux';
import History from '../components/history';

/**
 * Map actions to props for history component
 * @returns {Object} Actions object
 */
const historyMapDispatchToProps = () => {
	return {};
};

/**
 * Map state to props for history component
 * @returns {Object} Props
 */
const historyMapStateToProps = () => ({
	userId: JSON.parse(localStorage.getItem('userLogonDetails')).userId,
});

/**
 * Using connect, subscribe history component to redux store
 */
export default connect(historyMapStateToProps, historyMapDispatchToProps)(History);