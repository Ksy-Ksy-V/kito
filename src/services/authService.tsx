import { http } from './links';
import TokenService from './tokenService';

class AuthService {
	async signin(email: string, password: string) {
		return http
			.post('/auth/signin', {
				email,
				password,
			})

			.then((response) => {
				if (response.data.token) {
					TokenService.setUser(response.data);
				}
				return response.data;
			});
	}

	removeLocalUser() {
		TokenService.removeUser();
	}

	async signup(name: string, email: string, password: string) {
		return http
			.post('/auth/signup', {
				name,
				email,
				password,
			})
			.then((response) => {
				if (response.data.accessToken) {
					TokenService.setUser({
						isLoggedIn: true,
						user: {
							token: response.data.accessToken,
							refreshToken: response.data.refreshToken,
						},
						error: '',
						loading: false,
					});
				}
				return response.data;
			});
	}

	async signOut() {
		const refreshToken = TokenService.getLocalRefreshToken();
		return http
			.post('/auth/signout', { token: refreshToken })
			.then((response) => {
				this.removeLocalUser();
				return response.data;
			});
	}
}

export default new AuthService();
