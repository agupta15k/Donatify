/**@module getProfleAPI */

import axios from '../axios';

/**
 * API to get profile details from database
 * @param {Number} value Id of the user to be queried
 * @returns {Promise} Response for axios GET request
 */
const getProfleAPI = (id) => {
	return axios.get(`/profile?id=${id}`);
};
export default getProfleAPI;
