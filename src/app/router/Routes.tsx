import { createBrowserRouter } from "react-router-dom";
import ReportDashboard from "../features/reports/dashboard/ReportDashboard";
import App from "../layout/App";
import ReportForm from "../features/reports/form/ReportForm";
import ReportDetailedPage from "../features/reports/details/ReportDetailedPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/report', element: <ReportDashboard />},
            {path: '/report/:id', element: <ReportDetailedPage />},
            {path: '/manage/:id', element: <ReportForm />},
            {path: '/createReport', element: <ReportForm />},
        ]
    }

])