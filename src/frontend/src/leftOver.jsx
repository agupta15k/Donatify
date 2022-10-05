import React from "react";
import RegisterUser from "./components/register";
import LoginUser from "./components/login";
import Home from './components/home';

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

class LeftOver extends React.Component {
    render() {
        const router = createBrowserRouter([
            {
                path: "/",
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

        return <RouterProvider router={router} />;
    }
}

export default LeftOver;
