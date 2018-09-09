import Config from './Config';
import axios from 'axios';

export default {
  url: Config.api + '/report',

  reportStory(storyId, token, data) {
    return axios.post(this.url + '/story/' + storyId + '/?token=' + token, data);
  },
};
