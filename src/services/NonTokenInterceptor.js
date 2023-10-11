import axios from 'axios';

const NonTokenInterceptor = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	// timeout: 15000,
});

// request interceptors
NonTokenInterceptor.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

NonTokenInterceptor.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		return error;
	},
);

export default NonTokenInterceptor;
