import registerUserContainer from "../../containers/registerUser";
import { connect } from "react-redux";
import RegisterUser from '../../components/register';

describe('homeContainer', () => {
    it('should connect registerUser component to store', () => {
        expect(JSON.stringify(connect(() => {}, () => {})(RegisterUser))).toEqual(JSON.stringify(registerUserContainer));
    });
});
