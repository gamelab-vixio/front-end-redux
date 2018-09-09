import Config from './Config';
import axios from 'axios';

export default {
  url: Config.api + '/blog',
  getAllBlogPosts(page) {
    if (page) {
      return axios.get(this.url + '/getPublishedBlog/?page=' + page);
    } else {
      return axios.get(this.url + '/getPublishedBlog');
    }
  },
  getPostById(blogId) {
    return axios.get(this.url + '/getPost/' + blogId);
  },
  createComment(data, blogId, token, commentParentId) {
    if (commentParentId) {
      return axios.post(this.url + '/createComment/' + blogId + '/' + commentParentId + '/?token=' + token, data);
    } else {
      return axios.post(this.url + '/createComment/' + blogId + '/?token=' + token, data);
    }
  },
};
