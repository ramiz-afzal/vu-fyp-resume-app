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
			const authToken = await getValue('accessToken');
			if (!authToken) {
				return false;
			}
			const response = await axios.post('/auth/token/validate', { accessToken: authToken });
			if (response.data.isValid && response.data.isValid == true) {
				isAuthTokenValid = true;
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
		}
		return isAuthTokenValid;
	},
	getBearerToken: async function () {
		const token = await getValue('accessToken');
		if (!token) {
			return false;
		}

		const isAuthTokenValid = await authService.isAuthTokenValid();
		if (isAuthTokenValid) {
			return token;
		}

		const refreshAuthToken = await authService.refreshAuthToken();
		if (refreshAuthToken) {
			return await getValue('accessToken');
		}

		return false;
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
			console.log(error.response.data);
		}
		return status;
	},
	setLogin: async function (email, password) {
		if (!email || !password) {
			return false;
		}
		try {
			const response = await axios.post('/auth/login', { email: email, password: password });
			if (response && response.data.accessToken && response.data.refreshToken) {
				await setValue('accessToken', response.data.accessToken);
				await setValue('refreshToken', response.data.refreshToken);
				await setValue('user', JSON.stringify(response.data.user));
				return true;
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
		}
		return false;
	},
	setLogout: async function () {
		try {
			const isLoggedIn = await authService.isLoggedIn();
			if (!isLoggedIn) {
				return true;
			}

			const refreshToken = await getValue('refreshToken');
			const token = await authService.getBearerToken();
			const response = await axios.post(
				'/auth/logout',
				{ refreshToken: refreshToken },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200) {
				await setValue('accessToken', '');
				await setValue('refreshToken', '');
				await setValue('companyId', '');
				await setValue('user', '');
				return true;
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
		}
		return false;
	},
};

export default authService;
