// import { connect } from "react-redux";
// import Login from '../components/login';
// import onSubmitLoginAPI from '../API/login';

// const mapDispatchToProps = dispatch => {
//     return {
//         dispatch_login_action: async (value) => {
//             try {
//                 let res = await onSubmitLoginAPI(value)
//                 if (res.data.success) {
//                     dispatch({
//                         type: "SUBMITLOGIN",
//                         payload: data
//                     })
//                 }
//             } catch (error) {
//                 console.log(error)
//             }
//         },

//         // accept: async (value) => {
//         //     try {
//         //         let res = await AcceptFollowRequestAPI(value);
//         //         if (res.data.success) {
//         //             dispatch({
//         //                 type: "ACCEPTFOLLOW",
//         //                 payload: res.data.followRequests
//         //             })
//         //         }
//         //     } catch (error) {
//         //         console.log(error)
//         //     }
//         // },

//         // decline: async (value) => {
//         //     try {
//         //         let res = await DeclineFollowRequestAPI(value)
//         //         if (res.data.success) {
//         //             dispatch({
//         //                 type: "DECLINEFOLLOW",
//         //                 payload: value
//         //             })
//         //         }
//         //     } catch (error) {
//         //         console.log(error)
//         //     }
//         // },
//     }
// }

// const mapStateToProps = state => ({
//     user_id: state.loginReducer.user_id,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login);













// // import LoginAPI from '../API/login';

// // export const onNameChange = (value) => {
// // }
// // export const onPasswordChange = (value) => {

// // }

// // export const onSubmitLogin = async (value) => {
// //     try {
// //         let res = await LoginAPI(value)
// //         // if (res.data.success) {
// //             return res.data;
// //         // }
// //     } catch (error) {
// //         console.log(error)
// //     }
// // }

// // export const setUserName = (value) => {

// // }

// // export const setUserUserName = (value) => {

// // }