import marketPlaceContainer from '../../containers/marketPlace';
import { connect } from 'react-redux';
import MarketPlace from '../../components/marketPlace';

describe('homeContainer', () => {
	it('should connect marketPlace component to store', () => {
		expect(JSON.stringify(connect(() => {}, () => {})(MarketPlace))).toEqual(JSON.stringify(marketPlaceContainer));
	});
});
