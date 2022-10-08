import registerUserApi from '../../API/registerUser';
import axios from '../../axios';

describe('registerUserApi', () => {
    it('should call axios post with correct input', () => {
        const mockApiInput = {
            name: 'test',
            email: 'test@test.com',
            pass: 'test',
            rePass: 'test',
            cities: ['city1', 'city2'],
            zipCodes: ['123', '234'],
            interests: ['interest1', 'interest2']
        };
        const expectedApiInput = {
            name: 'test',
            email: 'test@test.com',
            password: 'test',
            repeatpassword: 'test',
            city: ['city1', 'city2'],
            zipcode: ['123', '234'],
            interests: ['interest1', 'interest2']
        };
        axios.post = jest.fn();
        registerUserApi(mockApiInput);
        expect(axios.post).toHaveBeenCalledWith('/register', expectedApiInput);
        jest.clearAllMocks();
    });
});