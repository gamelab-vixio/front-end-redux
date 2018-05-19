import Config from './Config';
import axios from 'axios';

export default {
	url : Config.api + '/blog',
	
	getAllBlogPosts(){
		return axios.get(this.url + '/getPublishedBlog');
	},
	getPostById(blogId) {
		return axios.get(this.url + '/getPost/' + blogId);
	},
	createComment(commentParentData, blogId, token) {
		return axios.post(this.url + '/createComment/' + blogId + '/?token=' + token, commentParentData)
	}
}