import getRecipientHistoryAPI from '../../API/getRecipientHistory';
import axios from '../../axios';

describe('getRecipientHistoryAPI', () => {
    it('should call axios post with correct input', () => {
        axios.get = jest.fn();
        getRecipientHistoryAPI(1);
        expect(axios.get).toHaveBeenCalledWith('/recipient/history?id=1');
        jest.clearAllMocks();
    });
});