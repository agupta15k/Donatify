import recieveItemAPI from '../../API/recieveItem';
import axios from '../../axios';

describe('recieveItemAPI', () => {
	it('should call axios put with correct input', () => {
		const mockApiInput = {
			itemId: 1,
			userId: 1
		};
		const expectedApiInput = {
			itemId: 1,
			userId: 1
		};
		axios.put = jest.fn();
		recieveItemAPI(mockApiInput);
		expect(axios.put).toHaveBeenCalledWith('/items/recieve', expectedApiInput);
		jest.clearAllMocks();
	});
});