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
import { RegisterAdmin } from "../Authentication/register/register.js";
// import DriverPaymentHistory from "../views/payments/PaymentHistory.js";
import JobDetailScreen from "../views/job/JobDetail.js";
import ForgotPassword from "../Authentication/ForgotPassword/ForgotPassword.js";
import ResetPassword from "../Authentication/ForgotPassword/ResetPassword.js";
// import JobForm from "../views/job/CreateJob.js";
import TransactionHistory from "../views/payments/PaymentHistory.js";
import JobTable from "../views/job/JobCandidateTable.js";
import { Job } from "../views/job/index.js";
import TransactionHistoryList from "../views/payments/TransactionHistory.js";
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
        path: "/all-candidates/:id",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<JobDetailScreen />} />}
          />
        ),
      },
      {
        path: "/transaction-history",
        exact: true,
        element: (
          <ProtectedRoute
            component={<ProtectedRoute component={<TransactionHistoryList />} />}
          />
        ),
      }
    ],
  },
  {
    path: "/auth",
    element: <Outlet />,
    children: [{ path: "/auth/login", element: <Loginform /> }, { path: "/auth/forgot-password", element: <ForgotPassword /> }, { path: "/auth/reset-password", element: <ResetPassword /> } , { path: "/auth/register", element: <RegisterAdmin /> }],
  },
];

export default Router;
