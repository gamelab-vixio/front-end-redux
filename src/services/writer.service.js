import Config from './Config';
import axios from 'axios';

export default {
	url : Config.api + '/story/writer',

	getStoryList(token, page){
		if(page){
			return axios.get(this.url + '/getStoryList/?token=' + token + '&page=' + page);
		}
		else{
			return axios.get(this.url + '/getStoryList?token=' + token);
		}
	},
	getStoryContent(id, token){
		return axios.get(this.url + '/getContent/' + id + '/?token=' + token);
	},
	getStoryRead(id, token){
		return axios.get(this.url + '/getStory/' + id + '/?token=' + token);
	},
	deleteStory(id, token){
		return axios.get(this.url + '/delete/' + id + '/?token=' + token);
	},
	publishStory(id, token, data){
		return axios.post(this.url + '/publish/' + id + '/?token=' + token, data);
	},
	unpublishStory(id, token){
		return axios.get(this.url + '/unpublish/' + id + '/?token=' + token);
	},
	updateStory(id, token, storyData){
		return axios.post(this.url + '/update/' + id + '/?token=' + token, storyData);
	},
	searchStory(name, token, page_number){
		if(page_number) {
			return axios.get(this.url + '/search/' + name + '/?token=' + token + '&page=' + page_number);
		}
		else {
			return axios.get(this.url + '/search/' + name + '/?token=' + token);
		}
	}
}
