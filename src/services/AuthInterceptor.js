import axios from 'axios';

const AuthInterceptor = axios.create({
	// baseURL: process.env.REACT_APP_AUTH_URL,
	// timeout: 15000,
});

// request interceptors
AuthInterceptor.interceptors.request.use(
	config => {
		config.params = { ...config.params, apiKey: process.env.REACT_APP_API_KEY };
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

AuthInterceptor.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return error
		// return Promise.reject(error); 

		// const status = error.response.status;
		//
		// switch (status) {
		// 	case 401: {
		// 		window.location.href = '/';
		// 		return Promise.reject(error.message);
		// 	}

		// 	case 403: {
		// 		window.location.href = '/';
		// 		return Promise.reject(error.message);
		// 	}

		// 	default: {
		// 		return Promise.reject(error);
		// 	}
		// }
	},
);

export default AuthInterceptor;
