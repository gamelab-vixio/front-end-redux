import Config from './Config';
import axios from 'axios';

export default {
	url : Config.api + '/story',
	
	getAllStories(page_number){
		if(page_number) {
			return axios.get(this.url + '/getStoryList?page=' + page_number);
		}
		else {
			return axios.get(this.url + '/getStoryList');
		}
	}
}

