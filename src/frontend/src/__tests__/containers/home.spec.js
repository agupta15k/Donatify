import homeContainer from "../../containers/home";
import { connect } from "react-redux";
import Home from '../../components/home';

describe('homeContainer', () => {
    it('should call axios post with correct input', () => {
        expect(JSON.stringify(connect(() => {}, () => {})(Home))).toEqual(JSON.stringify(homeContainer));
    });
});
