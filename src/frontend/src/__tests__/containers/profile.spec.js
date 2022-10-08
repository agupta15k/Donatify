import profileContainer from "../../containers/profile";
import { connect } from "react-redux";
import Profile from '../../components/profile';

describe('homeContainer', () => {
    it('should call axios post with correct input', () => {
        expect(JSON.stringify(connect(() => {}, () => {})(Profile))).toEqual(JSON.stringify(profileContainer));
    });
});
