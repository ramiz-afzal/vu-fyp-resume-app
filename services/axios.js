import axios from 'axios';
let axiosConfig = {
	baseURL: 'http://10.0.2.2:8080/api/v1',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
};
const instance = axios.create(axiosConfig);
export default instance;
