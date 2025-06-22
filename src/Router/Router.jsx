import { createBrowserRouter } from "react-router";
import Mainlayout from "../Mainlayout/Mainlayout";
import Home from "../Home/Home";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout/>,
      children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
          path: '/coverage',
          element: <Coverage/>
        }
      ]
    },
    {
      path: '/',
      element: <AuthLayout></AuthLayout>,
      children: [
        {
          path: '/login',
          element: <Login></Login>
        }, 
        {
          path: '/register',
          element: <Register></Register>
        }
      ]
    }
  ]);