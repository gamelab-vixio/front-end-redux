export default class AuthService {
	
	setToken(idToken) {
		// Saves user token to localStorage
		localStorage.setItem('id_token', idToken)
	}

   getToken() {
      // Retrieves the user token from localStorage
      return localStorage.getItem('id_token')
   }

   logout() {
      // Clear user token and profile data from localStorage
      localStorage.removeItem('id_token');
   }
}