import { connect } from "react-redux";
import History from '../components/history';

const mapDispatchToProps = dispatch => {
    return {
    }
}

const mapStateToProps = state => ({
    userId: state.loginReducer.userId,
})

export default connect(mapStateToProps, mapDispatchToProps)(History);