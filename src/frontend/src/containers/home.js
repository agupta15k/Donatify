import { connect } from "react-redux";
import Home from '../components/home';
import getProfleAPI from '../API/getProfile';
import addItemApi from "../API/addItem";

const mapDispatchToProps = dispatch => {
    return {
        onAddItem: async (value) => {
            try {
                let res = await addItemApi(value)
                dispatch({
                    type: res && res.data && res.data.status === 200 ? 'SUBMITITEM' : 'ITEMADDFAILURE',
                    payload: res.data
                });
            } catch (error) {
                console.error('Some error occurred while calling axios API', error)
            }
        }
    }
}

const mapStateToProps = state =>  ({
    apiStatus: state.home.success,
    apiMessage: state.home.message,
    userId: JSON.parse(localStorage.getItem('userLogonDetails')).userId
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
