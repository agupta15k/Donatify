import getDonorHistoryAPI from '../../API/getDonorHistory';
import axios from '../../axios';

describe('getDonorHistoryAPI', () => {
    it('should call axios get with correct input', () => {
        axios.get = jest.fn();
        getDonorHistoryAPI(1);
        expect(axios.get).toHaveBeenCalledWith('/donor/history?id=1');
        jest.clearAllMocks();
    });
});