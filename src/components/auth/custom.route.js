import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../providers/auth.provider';
import AdminLayout from '../admin/layout';
import config from '../../services/config';

const CustomRoute = ({ children, isProtected }) => {

	let { User } = useAuth();
	let location = useLocation();

	let from = location.state?.from?.pathname;

	if (isProtected) {
		if (!User) return <Navigate to={config.routes.login.pathname} state={{ from: location }} />;

		if (from && !from.startsWith('/admin'))
			return <Navigate to={config.routes.admin.pathname} state={{ from: location }} />;

		return <AdminLayout>{children}</AdminLayout>;
	}

	if (User && from && !from.startsWith('/admin'))
		return <Navigate to={config.routes.admin.pathname} state={{ from: location }} />;

	return children;
};

export default CustomRoute;
