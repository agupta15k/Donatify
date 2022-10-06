import React from "react";
import RegisterUser from "./containers/registerUser";
import LoginUser from "./containers/login";
import Home from './components/home';
import { Provider } from 'react-redux';
import store from './app/store';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

class LeftOver extends React.Component {
    render() {
        const router = createBrowserRouter([
            {
                path: "*",
                element: <LoginUser />,
            },
            {
                path: "/register",
                element: <RegisterUser />,
            },
            {
                path: "/home",
                element: <Home />
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