import { AuthState } from '../models/AuthModels';

class TokenService {
  getLocalRefreshToken() {
    const user = this.getUser();
    return user?.token;
  }

  getLocaltoken() {
    const user = this.getUser();
    return user?.token;
  }

  updateLocalRefreshToken(token: string) {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const parsed = JSON.parse(userJson);
        if (parsed.user && typeof parsed.user === 'object') {
          parsed.user.refreshToken = token;
          localStorage.setItem('user', JSON.stringify(parsed));
        } else if (parsed.token !== undefined) {
          parsed.refreshToken = token;
          localStorage.setItem('user', JSON.stringify(parsed));
        }
      } catch {}
    }
  }

  updateLocaltoken(token: string) {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const parsed = JSON.parse(userJson);
        if (parsed.user && typeof parsed.user === 'object') {
          parsed.user.token = token;
          localStorage.setItem('user', JSON.stringify(parsed));
        } else if (parsed.token !== undefined) {
          parsed.token = token;
          localStorage.setItem('user', JSON.stringify(parsed));
        }
      } catch {}
    }
  }

  getUser() {
    const userJson = localStorage.getItem('user');
    if (userJson === null) {
      return { token: '', refreshToken: '' };
    }
    try {
      const parsed = JSON.parse(userJson);
      if (parsed.user && typeof parsed.user === 'object') {
        return parsed.user;
      }
      if (parsed.token !== undefined) {
        return parsed;
      }
      return { token: '', refreshToken: '' };
    } catch {
      return { token: '', refreshToken: '' };
    }
  }

  setUser(user: AuthState) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('user');
  }
}

export default new TokenService();
