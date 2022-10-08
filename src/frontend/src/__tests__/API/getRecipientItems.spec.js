import getRecipientItemsAPI from '../../API/getRecipientItems';
import axios from '../../axios';

describe('getRecipientItemsAPI', () => {
    it('should call axios post with correct input', () => {
        axios.get = jest.fn();
        getRecipientItemsAPI(1);
        expect(axios.get).toHaveBeenCalledWith('/items?page=1&id=1');
        jest.clearAllMocks();
    });
});