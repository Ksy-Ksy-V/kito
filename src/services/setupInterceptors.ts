import { refreshToken } from '../store/reducers/authSlice';
import { http, httpPublic } from './links';
import TokenService from './tokenService';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setup = (store: any) => {
	http.interceptors.request.use(
		(config) => {
			const token = TokenService.getLocaltoken();
			if (token) {
				config.headers['Authorization'] = 'Bearer ' + token;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	const { dispatch } = store;
	http.interceptors.response.use(
		(res) => {
			return res;
		},

		async (err) => {
			const originalConfig = err.config;

			if (originalConfig.url !== '/auth/signin' && err.response) {
				// Access Token was expired
				if (err.response.status === 401 && !originalConfig._retry) {
					originalConfig._retry = true;
					try {
						const token = TokenService.getLocalRefreshToken();
						const rs = await httpPublic.get('/auth/refresh-token', {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						});
						dispatch(refreshToken(rs.data));
						TokenService.updateLocaltoken(rs.data.token);
						TokenService.updateLocalRefreshToken(
							rs.data.refreshToken
						);

						return http(originalConfig);
					} catch (_error) {
						return Promise.reject(_error);
					}
				}
			}

			return Promise.reject(err);
		}
	);
};

export default setup;
