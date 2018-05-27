import Config from './Config';
import axios from 'axios';

export default {
	url : Config.api + '/user',
	
	getUserProfile(token){
		return axios.get(this.url + '/getUser?token=' + token);
	},

	userLoadImage(token){
		return axios.get(this.url + '/loadImage?token=' + token, {responseType: 'arraybuffer'});
	},

	userEditProfile(token, editData){
		return axios.post(this.url + '/uploadImage?token=' + token, editData);
	},
	userChangePassword(token, userData){
		return axios.post(this.url + '/changePassword?token=' + token, userData);
	},
	getHistory(page_number, token){
		if(page_number) {
			return axios.get(this.url + '/history?token=' + token + '&page=' + page_number);
		}
		else {
			return axios.get(this.url + '/history?token=' + token);
		}
	}
}