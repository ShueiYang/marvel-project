import { Outlet, Navigate } from "react-router-dom";


const PrivateRoutes = ({ user }) => {

    if (user) { 
        return <Outlet />
    }
    return <Navigate to="/"/>
};

export default PrivateRoutes;