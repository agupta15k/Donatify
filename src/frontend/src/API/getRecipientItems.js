/**@module getRecipientItemsAPI */

import axios from '../axios';

/**
 * API to get items for a specific user
 * @param {Number} value User id to get items for the user
 * @returns {Promise} Response for axios GET request
 */
const getRecipientItemsAPI = (id) => {
	return axios.get(`/items?page=1&id=${id}`);
};
export default getRecipientItemsAPI;
