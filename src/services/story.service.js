import Config from './Config';
import axios from 'axios';

export default {
  url: Config.api + '/story',
  another_url: Config.api,

  getAllStories(page_number) {
    if (page_number) {
      return axios.get(this.url + '/getStoryList?page=' + page_number);
    } else {
      return axios.get(this.url + '/getStoryList');
    }
  },
  getStoryCategories() {
    return axios.get(this.another_url + '/category/genre/get');
  },
  createStory(token, storyData) {
    return axios.post(this.url + '/create?token=' + token, storyData);
  },
  playStory(storyId) {
    return axios.get(this.url + '/playStory/' + storyId);
  },
  getStoryContent(storyId) {
    return axios.get(this.url + '/getStory/' + storyId);
  },
  searchStory(name, page_number) {
    if (page_number) {
      return axios.get(this.url + '/search/' + name + '/?page=' + page_number);
    } else {
      return axios.get(this.url + '/search/' + name);
    }
  },
  addPlayed(storyId, token) {
    if (token) {
      return axios.get(this.url + '/addPlayed/' + storyId + '/?token=' + token);
    } else {
      return axios.get(this.url + '/addPlayed/' + storyId);
    }
  },
  addReviewStory(storyId, token, star) {
    return axios.post(this.url + '/addReviewStory/' + storyId + '/?token=' + token, star);
  },
  createComment(data, story_id, token, commentParentId) {
    if (commentParentId) {
      return axios.post(this.url + '/createComment/' + story_id + '/' + commentParentId + '/?token=' + token, data);
    } else {
      return axios.post(this.url + '/createComment/' + story_id + '/?token=' + token, data);
    }
  },
  mostPopular() {
    return axios.get(this.url + '/getMostPopular');
  },
  newAvailable() {
    return axios.get(this.url + '/getNewAvailable');
  },
  userBased(token) {
    return axios.get(this.url + '/getUserBased/?token=' + token);
  },
  itemBased(storyId) {
    return axios.get(this.url + '/getItemBased/' + storyId);
  },
};
