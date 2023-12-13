import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";

export default function RequireAuth() {
    const {authenticated, } = useAppSelector(state => state.auth);
    const location = useLocation();

    if (!authenticated ) {
        return <Navigate to='/unauthorized' replace state={{from: location}} />
    }

    return (
        <Outlet />
    )
}