/**@module getRecipientHistoryAPI */

import axios from '../axios';

/**
 * API to get recipient history from database
 * @param {Number} value Id of the recipient user
 * @returns {Promise} Response for axios GET request
 */
const getRecipientHistoryAPI = (id) => {
	return axios.get(`/recipient/history?id=${id}`);
};
export default getRecipientHistoryAPI;
