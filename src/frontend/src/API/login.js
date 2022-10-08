import axios from '../axios';

const loginAPI = (value) => {
    // Success dummy response
    // return {
    //     data: {
    //         status: 200,
    //         message: 'Logged in Successfully',
    //         data: {
    //             ID: 2,
    //             city: [
    //                 'raleigh',
    //                 'cary',
    //                 'durham'
    //             ],
    //             email: 'a@gmail.com',
    //             interests: [
    //                 'chair1'
    //             ],
    //             name: 'a',
    //             zipCode: [
    //                 '123',
    //                 '543'
    //             ]
    //         }
    //     }
    // };
    // Failure dummy response
    // return {
    //     data: {
    //         status: 405,
    //         message: 'Incorrect email/password',
    //         data: {}
    //     }
    // };
    // Todo: Uncomment this and remove the test API response once API is up and running
    return axios.post('/login', {
        email: value.email,
        password: value.pass
    });
}
export default loginAPI;
