import historyContainer from '../../containers/history';
import { connect } from 'react-redux';
import History from '../../components/history';

describe('historyContainer', () => {
	it('should connect history component to store', () => {
		expect(JSON.stringify(connect(() => {}, () => {})(History))).toEqual(JSON.stringify(historyContainer));
	});
});
