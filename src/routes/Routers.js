import React, { lazy } from "react";
import FullLayout from '../dashboard/Dashboard';
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";
import Loginform from "../Authentication/Loginform/Loginform";
import { Outlet } from "react-router-dom";

const Router = [
  {
    path: '/',
    element: <Outlet/>,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <ProtectedRoute component={<FullLayout />} /> },
    ],
  },
  {
    path: '/auth',
    element: <Outlet/>,
    children: [
      { path: '/auth/login', element: <Loginform /> }
    ]
  }
];

export default Router;