import React from "react";
import RegisterUser from "./components/register";
import LoginUser from "./components/login";
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
                path: "register",
                element: <RegisterUser />,
            },
        ]);

        return <RouterProvider router={router} />;
    }
}

export default LeftOver;
