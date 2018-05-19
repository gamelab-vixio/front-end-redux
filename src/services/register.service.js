import Config from './Config';
import axios from 'axios';

export default {
	url : Config.api + '/signup',
	
	registerNewUser(registerData){
		return axios.post(this.url, registerData);
	}
}