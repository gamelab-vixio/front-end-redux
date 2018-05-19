import Config from './Config';
import axios from 'axios';

export default {
	url : Config.api + '/docs',
	getTableOfContent() {
		return axios.get(this.url + '/getTableOfContent');
	},
}