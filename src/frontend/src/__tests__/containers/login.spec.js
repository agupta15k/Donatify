import loginContainer from "../../containers/login";
import { connect } from "react-redux";
import Login from '../../components/login';

describe('homeContainer', () => {
    it('should call axios post with correct input', () => {
        expect(JSON.stringify(connect(() => {}, () => {})(Login))).toEqual(JSON.stringify(loginContainer));
    });
});
