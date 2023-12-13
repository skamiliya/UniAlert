import { createBrowserRouter } from "react-router-dom";
import ReportDashboard from "../features/reports/dashboard/ReportDashboard";
import App from "../layout/App";
import ReportForm from "../features/reports/form/ReportForm";
import ReportDetailedPage from "../features/reports/details/ReportDetailedPage";
import Scratch from "../features/scratch/Scratch";
import AccountPage from "../features/auth/AccountPage";
import ProfilePage from "../features/profiles/ProfilePage";
import RequireAuth from "./RequireAuth";
import UnauthComponent from "../layout/UnauthComponent";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: '/manage/:id', element: <ReportForm />},
                {path: '/profiles/:id', element: <ProfilePage />},
                {path: '/createReport', element: <ReportForm key='create' />},
                {path: '/account', element: <AccountPage />},
            ]},
      { path: "/reports", element: <ReportDashboard /> },
      { path: "/reports/:id", element: <ReportDetailedPage /> },
      { path: "/scratch", element: <Scratch /> },
      { path: "/unauthorized", element: <UnauthComponent /> },
    ],
  },
]);
