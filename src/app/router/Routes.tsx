import { createBrowserRouter } from "react-router-dom";
import ReportDashboard from "../features/reports/dashboard/ReportDashboard";
import App from "../layout/App";
import ReportForm from "../features/reports/form/ReportForm";
import ReportDetailedPage from "../features/reports/details/ReportDetailedPage"
import Scratch from "../features/scratch/Scratch"
import AccountPage from "../features/auth/AccountPage";
import ProfilePage from "../features/profiles/ProfilePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/reports', element: <ReportDashboard />},
            {path: '/reports/:id', element: <ReportDetailedPage />},
            {path: '/manage/:id', element: <ReportForm />},
            {path: '/profiles/:id', element: <ProfilePage />},
            {path: '/createReport', element: <ReportForm key='create' />},
            {path: '/account', element: <AccountPage />},
            {path: '/scratch', element: <Scratch />},
        ]
    }

])