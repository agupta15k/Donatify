import updateProfileAPI from '../../API/updateProfile';
import axios from '../../axios';

describe('updateProfileAPI', () => {
    it('should call axios post with correct input', () => {
        const mockApiInput = {
            id: 1,
            name: 'abc',
            email: 'email',
            city: ['raleigh', 'durham', 'charlotte'],
            zipCodes: ['12345', '27606'],
            password: 'abcdef',
            interests: []
        };
        axios.put = jest.fn();
        updateProfileAPI(mockApiInput);
        expect(axios.put).toHaveBeenCalledWith('/profile', mockApiInput);
        jest.clearAllMocks();
    });
});