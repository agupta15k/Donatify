import loginContainer from "../../containers/login";
import { connect } from "react-redux";
import Login from '../../components/login';

describe('homeContainer', () => {
    it('should connect login component to storet', () => {
        expect(JSON.stringify(connect(() => {}, () => {})(Login))).toEqual(JSON.stringify(loginContainer));
    });
});
