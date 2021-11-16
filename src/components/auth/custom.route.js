import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useAuth } from "../providers/auth.provider"
import config from "../../services/config";
import { confirmPasswordReset } from "firebase/auth";
import React from "react";

const CustomRoute = ({ children, isProtected }) => {
    let auth = useAuth();
    let { User } = useAuth();
    let location = useLocation();


    if (isProtected) {
        if (!User) {
            return <Navigate to={config.routes.login.pathname} state={{ from: location }} />;
        }
        return children
    }
    // public
    if (User) {
        return <Navigate to={config.routes.login.pathname} state={{ from: location }} />;
    }
    return children



}
export default CustomRoute;