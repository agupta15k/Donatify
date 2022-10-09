import React from 'react';
import RegisterUser from './containers/registerUser';
import LoginUser from './containers/login';
import Home from './containers/home';
import { Provider } from 'react-redux';
import store from './app/store';
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';

/**
 * Root component to connect child components with redux store and render them
 * @extends React.Component
 */
class LeftOver extends React.Component {
	/**
	 * Create and return a router to render the respective component based on the path in URL
	 * @returns {React.Component} Router with respective component subscribed to the shared redux store
	 * <br/>
	 */
	render() {
		const router = createBrowserRouter([
			{
				path: '*',
				element: <LoginUser />,
			},
			{
				path: '/register',
				element: <RegisterUser />,
			},
			{
				path: '/home',
				element: <Home />
			},
			{
				path: '/home/profile',
				element: <Home tab={'profile'} />
			},
			{
				path: '/home/history',
				element: <Home tab={'history'} />
			},
			{
				path: '/home/donate',
				element: <Home tab={'donate'} />
			},
			{
				path: '/home/marketPlace',
				element: <Home tab={'marketPlace'} />
			}
		]);

		return (
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		);
	}
}

export default LeftOver;
