import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Main from "../components/Main";
import Mybills from "../components/Mybills";
import Bills from "../components/Bills";
import Auth from "../layouts/Auth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../components/About";
import BillDetails from "../components/BillDetails";
import PrivateRoute from "../providers/PrivateRoute";

export const AllRoute = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    HydrateFallback: Loading,
    children: [
      {
        index: true,
        // HydrateFallback: Loading,
        loader: async () => {
          const res = await fetch("http://localhost:3000/bills");
          if (!res.ok) throw new Error("Failed to fetch bills");
          return res.json();
        },
        element: <Main />,
      },
      {
        path: "mybills",
        element: <PrivateRoute><Mybills /></PrivateRoute>,
      },
      {
        path: "bills",
        loader: () => fetch("http://localhost:3000/bills"),
        HydrateFallback: Loading,
        element: <Bills />,
      },
      {
        path: "/bills/:id",
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/bills/${params.id}`);
          if (!res.ok) throw new Error("Failed to fetch bill details");
          return res.json();
        },
        HydrateFallback: Loading,
        element: (
          <PrivateRoute>
            <BillDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/auth",
    Component: Auth,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);
