import axios from '../axios';

const registerUserApi = (value) => {
    // Success dummy response
    // return {
    //     data: {
    //         status: 200,
    //         message: 'You have registered successfully',
    //         data: {}
    //     }
    // };
    // Failure dummy response
    // return {
    //     data: {
    //         status: 405,
    //         message: 'Registration failed',
    //         data: {}
    //     }
    // };
    // Todo: Uncomment this and remove the test API response once API is up and running
    return axios.post('/register', {
        name: value.name,
        email: value.email,
        password: value.pass,
        repeatpassword: value.rePass,
        city: value.cities,
        zipcode: value.zipCodes,
        interests: value.interests
    });
}
export default registerUserApi;
