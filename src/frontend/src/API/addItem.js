/**@module addItemApi */

import axios from '../axios';

/**
 * API to add item to the backend database
 * @param {Object} value Object to be inserted into database
 * @returns {Promise} Response for axios POST request
 */
const addItemApi = (value) => {
	// Success dummy response
	// return {
	//     data: {
	//         status: 200,
	//         message: 'Record inserted successfully into item table',
	//         data: {}
	//     }
	// };
	// Failure dummy response
	// return {
	//     data: {
	//         status: 400,
	//         message: 'Failed to insert into items table',
	//         data: {}
	//     }
	// };
	// Todo: Uncomment this and remove the test API response once API is up and running
	return axios.post('/additem', {
		item_name: value.itemName,
		quantity: value.itemQuantity,
		description: value.itemDescription,
		zipcode: value.itemZipCode,
		city: value.itemCity,
		donor_id: value.itemDonorId,
		category: value.itemCategory
	});
};
export default addItemApi;
