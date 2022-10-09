import { connect } from 'react-redux';
import MarketPlace from '../components/marketPlace';

const mapDispatchToProps = () => {
	return {};
};

const mapStateToProps = () => ({
	userId: JSON.parse(localStorage.getItem('userLogonDetails')).userId
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);