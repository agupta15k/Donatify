import axios from '../axios';

const registerUserApi = (value) => {
    return {
        status: 200,
        data: {
            success: true,
            user_id: 1
        }
    };
    // Todo: Uncomment this and remove the test API response once API is up and running
    // return axios.post('/login', {
    //     name: value.name,
    //     email: value.email,
    //     password: value.pass,
    //     repeatpassword: value.rePass,
    //     city: value.cities,
    //     zipcode: value.zipCodes,
    //     interests: value.interests
    // });
}
export default registerUserApi;
