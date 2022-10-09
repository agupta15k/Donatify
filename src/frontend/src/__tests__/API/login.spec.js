import loginAPI from '../../API/login';
import axios from '../../axios';

describe('loginAPI', () => {
	it('should call axios post with correct input', () => {
		const mockApiInput = {
			email: 'test@test.com',
			pass: 'test'
		};
		const expectedApiInput = {
			email: 'test@test.com',
			password: 'test'
		};
		axios.post = jest.fn();
		loginAPI(mockApiInput);
		expect(axios.post).toHaveBeenCalledWith('/login', expectedApiInput);
		jest.clearAllMocks();
	});
});