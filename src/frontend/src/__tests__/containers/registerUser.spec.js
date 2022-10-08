import registerUserContainer from "../../containers/registerUser";
import { connect } from "react-redux";
import RegisterUser from '../../components/register';

describe('homeContainer', () => {
    it('should call axios post with correct input', () => {
        expect(JSON.stringify(connect(() => {}, () => {})(RegisterUser))).toEqual(JSON.stringify(registerUserContainer));
    });
});
