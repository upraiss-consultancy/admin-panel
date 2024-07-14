import React, { lazy } from "react";
import FullLayout from "../dashboard/FullLayout";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";
import Loginform from "../Authentication/Loginform/Loginform";
import { Outlet } from "react-router-dom";
import Dashboard from "../views/dashoboard/dashboard";
import AllRides from "../views/ride-management/rides";
import Profile from "../views/profile/profile";
import Drivers from "../views/drivers/drivers";
import COADMIN from "../views/co-admin/ViewCoAdmin";

const Router = [
  {
    path: "/",
    element: <ProtectedRoute component={<FullLayout />} />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      {
        path: "/dashboard",
        exact: true,
        element: <ProtectedRoute component={<Dashboard />} />,
      },
      {
        path: "/rides",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<AllRides />} />}
          />
        ),
      },
      {
        path: "/profile",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<Profile />} />}
          />
        ),
      },
      {
        path: "/support",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<Profile />} />}
          />
        ),
      },
      {
        path: "/drivers",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<Drivers />} />}
          />
        ),
      },
      {
        path: "/co-admin",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<COADMIN />} />}
          />
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [{ path: "/auth/login", element: <Loginform /> }],
  },
];

export default Router;
