import Config from './Config';
import axios from 'axios';

export default {
  url: Config.api + '/login',

  loginUser(loginData) {
    return axios.post(this.url, loginData);
  },
};
