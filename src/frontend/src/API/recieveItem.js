/**@module recieveItemAPI */

import axios from '../axios';

/**
 * API to book the item
 * @param {Object} value Object containing item details
 * @returns {Promise} Response for axios PUT request
 */
const recieveItemAPI = (data) => {
	return axios.put('/items/recieve', {
		...data
	});
};
export default recieveItemAPI;
