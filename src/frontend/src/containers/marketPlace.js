import { connect } from "react-redux";
import MarketPlace from '../components/marketPlace';

const mapDispatchToProps = dispatch => {
    return {
    }
}

const mapStateToProps = state => ({
    userId: state.loginReducer.userId,
})

export default connect(mapStateToProps, mapDispatchToProps)(MarketPlace);