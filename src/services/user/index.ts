import {api} from '../api';

export const getUserInfo = () => api.get('/user/userInfo');