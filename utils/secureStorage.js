import * as SecureStore from 'expo-secure-store';
export const setValue = async (key, value) => {
	await SecureStore.setItemAsync(key, value);
};
export const getValue = async (key) => {
	let value = await SecureStore.getItemAsync(key);
	return value;
};
