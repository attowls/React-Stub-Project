import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ component: Component }) {

	const token = localStorage.getItem('token');
	// eslint-disable-next-line react/jsx-props-no-spreading
	return token ? Component : <Navigate to="/login" {...alert('로그인이 필요합니다.')} />;
}

export default PrivateRoute;
