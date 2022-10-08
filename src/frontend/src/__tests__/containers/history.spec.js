import historyContainer from '../../containers/history';
import { connect } from "react-redux";
import History from '../../components/history';

describe('historyContainer', () => {
    it('should call axios post with correct input', () => {
        expect(JSON.stringify(connect(() => {}, () => {})(History))).toEqual(JSON.stringify(historyContainer));
    });
});
