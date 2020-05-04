export default class AuthService {
  static setToken(token) {
    localStorage.setItem('access_token', token);
  }

  static getToken() {
    return localStorage.getItem('access_token');
  }

  static isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }
}
