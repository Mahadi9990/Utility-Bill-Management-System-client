import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Main from "../components/Main";
import Mybills from "../components/Mybills";
import Bills from "../components/Bills";
import Profile from "../components/Profile";
import Auth from "../layouts/Auth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../components/About";

export const AllRoute = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    HydrateFallback: Loading,
    children: [
      {
        index: true,
        loader:()=>fetch('/8data.json'),
        element:<Main/>
      },{
        path:'mybills',
        element:<Mybills/>
      }
      ,{
        path:'bills',
        element:<Bills/>
      }
      ,{
        path:'Profile',
        element:<Profile/>
      }
      ,{
        path:'about',
        element:<About/>
      }
    ],
  },
  {
    path:'/auth',
    Component:Auth,
    HydrateFallback:<Loading/>,
    children:[
        {
            index:true,
            Component:Login
        },{
            path:'register',
            Component:Register
        }
    ]
  },
  {
    path: "*",
    Component: Error,
  },
]);
