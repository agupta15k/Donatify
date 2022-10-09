import homeContainer from '../../containers/home';
import { connect } from 'react-redux';
import Home from '../../components/home';

describe('homeContainer', () => {
	it('should connect home component to store', () => {
		expect(JSON.stringify(connect(() => {}, () => {})(Home))).toEqual(JSON.stringify(homeContainer));
	});
});
