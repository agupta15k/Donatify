import addItemApi from "../../API/addItem";
import axios from '../../axios';

describe('addItemApi', () => {
    it('should call axios post with correct input', () => {
        const mockApiInput = {
            itemName: 'test',
            itemQuantity: 1,
            itemDescription: 'test',
            itemZipCode: 'test',
            itemCity: 'test',
            itemDonorId: 1,
            itemCategory: 'test'
        };
        const expectedApiInput = {
            item_name: 'test',
            quantity: 1,
            description: 'test',
            zipcode: 'test',
            city: 'test',
            donor_id: 1,
            category: 'test'
        };
        axios.post = jest.fn();
        addItemApi(mockApiInput);
        expect(axios.post).toHaveBeenCalledWith('/additem', expectedApiInput);
        jest.clearAllMocks();
    });
});