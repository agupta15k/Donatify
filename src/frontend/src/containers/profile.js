/**@module profileContainer */

import { connect } from 'react-redux';
import Profile from '../components/profile';

/**
 * Map actions to props for profile component
 * @returns {Object} Actions object
 */
const mapDispatchToProps = () => {
	return {
		// onUpdateProfile: async (value) => {
		//     try {
		//         let res = await updateProfieAPI(value)
		//         if (res.data.success) {
		//             dispatch({
		//                 type: "UPDATEPROFILE",
		//                 payload: res.data.user,
		//             });
		//         }
		//     } catch (error) {
		//         console.log(error)
		//     }
		// },

		// accept: async (value) => {
		//     try {
		//         let res = await AcceptFollowRequestAPI(value);
		//         if (res.data.success) {
		//             dispatch({
		//                 type: "ACCEPTFOLLOW",
		//                 payload: res.data.followRequests
		//             })
		//         }
		//     } catch (error) {
		//         console.log(error)
		//     }
		// },

		// decline: async (value) => {
		//     try {
		//         let res = await DeclineFollowRequestAPI(value)
		//         if (res.data.success) {
		//             dispatch({
		//                 type: "DECLINEFOLLOW",
		//                 payload: value
		//             })
		//         }
		//     } catch (error) {
		//         console.log(error)
		//     }
		// },
	};
};

/**
 * Map state to props for profile component
 * @returns {Object} Props
 */
const mapStateToProps = () => ({
	userId: JSON.parse(localStorage.getItem('userLogonDetails')).userId
});

/**
 * Using connect, subscribe profile component to redux store
 */
export default connect(mapStateToProps, mapDispatchToProps)(Profile);