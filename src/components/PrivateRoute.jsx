import { Outlet, Navigate } from "react-router-dom";


const PrivateRoutes = ({ user, setVisible }) => {

    if (user) { 
        return <Outlet />
    }
    setVisible(true);
    return <Navigate to="/"/>
};

export default PrivateRoutes;