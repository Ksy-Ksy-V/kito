import { http } from './links';
import TokenService from './tokenService';

class AuthService {
	async signin(email: string, password: string) {
		return http
			.post('/api/signin', {
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

	signout() {
		TokenService.removeUser();
	}

	async signup(name: string, email: string, password: string) {
		return http
			.post('/api/signup', {
				name,
				email,
				password,
			})
			.then((response) => {
				return response.data;
			});
	}

	async signOut() {
		const refreshToken = TokenService.getLocalRefreshToken();
		return http
			.post('/api/signout', { token: refreshToken })
			.then((response) => {
				this.signout();
				return response.data;
			});
	}
}

export default new AuthService();
