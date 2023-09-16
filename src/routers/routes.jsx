import {
    createBrowserRouter,
} from "react-router-dom";
import { Main } from "../layout/Main";
import { Home } from "../pages/home/Home";
import { Register } from "../layout/Register";
import { Login } from "../pages/login/Login";
import { SignUp } from "../pages/signUp/SignUp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
    {
        path: "/",
        element: <Register/>,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
            path: '/signUp',
                element: <SignUp />
            },
        ]
    },
]);