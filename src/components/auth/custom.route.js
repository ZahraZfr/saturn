import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../providers/auth.provider";
import config from "../../services/config";

const CustomRoute = ({ children, isProtected }) =>
{
	let { User } = useAuth();
	let location = useLocation();

	if (isProtected)
	{
		if (!User)
		{
			return <Navigate to={config.routes.login.pathname} state={{ from: location }} />;
		}
		return children;
	}

	if (User)
	{
		return <Navigate to={config.routes.chat.pathname} state={{ from: location }} />;
	}
	return children;
};

export default CustomRoute;