import getProfleAPI from '../../API/getProfile';
import axios from '../../axios';

describe('getProfleAPI', () => {
	it('should call axios get with correct input', () => {
		axios.get = jest.fn();
		getProfleAPI(1);
		expect(axios.get).toHaveBeenCalledWith('/profile?id=1');
		jest.clearAllMocks();
	});
});