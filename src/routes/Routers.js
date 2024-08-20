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
import RideDetailView from '../views/ride-management/RideDetails.js';
import Packages from "../views/packages/Packages.js";
// import DriverPaymentHistory from "../views/payments/PaymentHistory.js";
import JobDetailScreen from "../views/job/JobDetail.js";

// import JobForm from "../views/job/CreateJob.js";
import TransactionHistory from "../views/payments/PaymentHistory.js";
import JobTable from "../views/job/JobCandidateTable.js";
import { Job } from "../views/job/index.js";
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
        path: "/profile/:id",
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
      {
        path: "/ride-detail",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<RideDetailView />} />}
          />
        ),
      },
      {
        path: "/packages-detail",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<Packages />} />}
          />
        ),
      },
      {
        path: "/payment-detail",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<TransactionHistory />} />}
          />
        ),
      },
      {
        path: "/all-jobs",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<Job />} />}
          />
        ),
      },
      {
        path: "/all-candidates",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<JobTable />} />}
          />
        ),
      }
    ],
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [{ path: "/auth/login", element: <Loginform /> }],
  },
];

export default Router;
