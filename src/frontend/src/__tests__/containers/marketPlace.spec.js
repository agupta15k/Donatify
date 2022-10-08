import marketPlaceContainer from "../../containers/marketPlace";
import { connect } from "react-redux";
import MarketPlace from '../../components/marketPlace';

describe('homeContainer', () => {
    it('should call axios post with correct input', () => {
        expect(JSON.stringify(connect(() => {}, () => {})(MarketPlace))).toEqual(JSON.stringify(marketPlaceContainer));
    });
});
