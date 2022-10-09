import { connect } from 'react-redux';
import History from '../components/history';

const mapDispatchToProps = () => {
	return {
	};
};

const mapStateToProps = () => ({
	userId: JSON.parse(localStorage.getItem('userLogonDetails')).userId,
});

export default connect(mapStateToProps, mapDispatchToProps)(History);