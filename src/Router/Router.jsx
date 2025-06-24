import { createBrowserRouter } from "react-router";
import Mainlayout from "../Mainlayout/Mainlayout";
import Home from "../Home/Home";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/Parcel/SendParcel";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Mainlayout/Dashboard";
import MyParcels from "../Pages/Dashboard/Myparcels/MyParcels";

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
        }, 
        {
          path: '/sendParcel', 
          element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
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
    }, 
    {
      
        path: '/dashBoard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
              path: 'myParcels',
              Component: MyParcels
            }
        ]
    }
  ]);