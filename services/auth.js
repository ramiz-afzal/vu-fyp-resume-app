import { setValue, getValue } from '../utils/secureStorage';
import axios from './axios';

const authService = {
	isLoggedIn: async function () {
		const check1 = await authService.isAuthTokenValid();
		if (!check1) {
			await authService.refreshAuthToken();
		}

		const check2 = await authService.isAuthTokenValid();
		if (!check2) {
			return false;
		}

		return true;
	},
	isAuthTokenValid: async function () {
		let isAuthTokenValid = false;
		try {
			let authToken = await authService.getBearerToken();
			if (!authToken) {
				return false;
			}
			const response = await axios.post('/auth/token/validate', { accessToken: authToken });
			if (response.data.isValid && response.data.isValid == true) {
				isAuthTokenValid = true;
			}
		} catch (error) {
			console.log(error);
		}
		return isAuthTokenValid;
	},
	getBearerToken: async function () {
		const token = await getValue('accessToken');
		if (!token) {
			return false;
		}
		return token;
	},
	getRefreshToken: async function () {
		const token = await getValue('refreshToken');
		if (!token) {
			return false;
		}
		return token;
	},
	refreshAuthToken: async function () {
		let status = false;
		try {
			let refreshToken = await authService.getRefreshToken();
			if (!refreshToken) {
				return false;
			}
			const response = await axios.post('/auth/token/refresh', { refreshToken: refreshToken });
			if (response && response.data && response.data.accessToken) {
				await setValue('accessToken', response.data.accessToken);
				status = true;
			}
		} catch (error) {
			console.log(error);
		}
		return status;
	},
	setLogin: async function (email, password) {
		if (!email || !password) {
			return false;
		}
		axios
			.post('/auth/login', {
				email: email,
				password: password,
			})
			.then(async (response) => {
				if (!response.data.accessToken || !response.data.refreshToken) {
					return false;
				}
				await setValue('accessToken', response.data.accessToken);
				await setValue('refreshToken', response.data.refreshToken);
				await setValue('user', JSON.stringify(response.data.user));
				return true;
			})
			.catch((error) => {
				console.log(error);
				return false;
			});
	},
	setLogout: async function () {
		await setValue('accessToken', '');
		await setValue('refreshToken', '');
		await setValue('user', '');
		return true;
	},
};

export default authService;
