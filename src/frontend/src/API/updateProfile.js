/**@module updateProfileAPI */

import axios from '../axios';

/**
 * API to update profile details for a user
 * @param {Object} value Object containing updated user details
 * @returns {Promise} Response for axios PUT request
 */
const updateProfileAPI = (user) => {
	return axios.put('/profile', {
		...user
	});
};
export default updateProfileAPI;
