import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useAuth } from "../providers/auth.provider"
import config from "../../services/config";
import { confirmPasswordReset } from "firebase/auth";
import react from "react";

const CustomRoute = ({ children , isProtected })=>
{

    let auth = useLocation();
    let location = useLocation();


    if (isProtected){
        if (!auth.user) {
            return <Navigate to={config.routes.login.pathname} state={{ from: location }} />;
        }
        return children
    }
    // public
    if (auth.user) {
        return <Navigate to={config.routes.login.pathname} state={{ from: location }} />;
    }
    return children


    
}
export default CustomRoute;