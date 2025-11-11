import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Error from "../components/Error";
import Loading from "../components/Loading";

export const AllRoute = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    HydrateFallback:<Loading/>
  },
  {
    path:"*",
    Component:Error
  },
]);
