import { connect } from "react-redux";
import Home from '../components/home';
import getProfleAPI from '../API/getProfile';

const mapDispatchToProps = dispatch => {
    return {
        // onSubmitRegister: async (value) => {
        //     try {
        //         let res = await getProfleAPI(value)
        //         dispatch({
        //             type: res.status === 200 ? 'SUBMITREGISTER' : 'REGISTERFAILURE',
        //             payload: res
        //         });
        //     } catch (error) {
        //         console.error('Some error occurred while calling axios API', error)
        //     }
        // }
    }
}

const mapStateToProps = state => ({
    // apiStatus: state.registerReducer.success,
    // apiMessage: state.registerReducer.message
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
