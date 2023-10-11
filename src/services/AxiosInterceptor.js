import axios from 'axios';

const AxiosInterceptor = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	// timeout: 15000,
});

// request interceptors
AxiosInterceptor.interceptors.request.use(
	config => {
		const tokenData = localStorage.getItem('token');
		config.headers.Authorization = `Bearer ${JSON.parse(tokenData).accessToken}`;
		config.params = { ...config.params, apiKey: process.env.REACT_APP_API_KEY };
		return config;
	},
	error => {
		return Promise.reject(error);
	},
);

let isTokenRefreshing = false;
const refreshSubscribers = [];

const onTokenRefreshed = accessToken => {
	// eslint-disable-next-line array-callback-return
	console.log('ontokenrefreshed');
	// eslint-disable-next-line array-callback-return
	refreshSubscribers.map(callback => {
		const resp = callback(accessToken);
		console.log(resp);
	});
};

const addRefreshSubscriber = callback => {
	refreshSubscribers.push(callback);
};

AxiosInterceptor.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		if (error.response && error.response.status === 401) {
			console.log('hi');
			console.log(isTokenRefreshing);
			const originalRequest = error.config;
			if (isTokenRefreshing === false) {
				console.log('token refresh');
				isTokenRefreshing = true;
				const tokenData = await localStorage.getItem('token');
				const { refreshToken } = JSON.parse(tokenData);
				// token refresh 요청
				try {
					const resp = await axios.post(
						`${process.env.REACT_APP_AUTH_URL}/auth/token/refresh`,
						null,
						{
							params: { refreshToken },
							headers: {
								Authorization: null,
							},
						},
					);

					console.log(resp);

					// 새로운 토큰 저장
					if (parseInt(resp.status / 200, 10) === 1) {
						await localStorage.setItem('token', JSON.stringify(resp.data));

						// refresh 상태 해제
						isTokenRefreshing = false;

						axios.defaults.headers.common.Authorization = `Bearer ${resp.data.accessToken}`;

						// 401로 실패했던 요청을 새로운 accessToken으로 재요청
						onTokenRefreshed(resp.data.accessToken);
						// return axios(originalRequest);
					}
				} catch (e) {
					if (e.response.status === 401) {
						console.log(e);
						console.log(originalRequest);
						localStorage.clear();
						window.location.reload();
					}
				}
			}
			console.log('not refresh');
			const retryOriginalRequest = new Promise(resolve => {
				addRefreshSubscriber(accessToken => {
					originalRequest.headers.Authorization = `Bearer ${accessToken}`;
					resolve(axios(originalRequest));
				});
			});
			return retryOriginalRequest;
		}
		return error;
	},
);

export default AxiosInterceptor;
