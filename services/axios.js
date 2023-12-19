import axios from 'axios';
import { API_BASE_URL } from '../constants';
let axiosConfig = {
	baseURL: API_BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
};
const instance = axios.create(axiosConfig);
export default instance;
