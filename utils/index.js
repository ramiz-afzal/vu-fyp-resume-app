import { IMAGES } from '../constants';
export const isValidImage = (sourceURL) => {
	if (!sourceURL) {
		return false;
	}
	const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
	return pattern.test(sourceURL);
};
export const defaultImageSource = (sourceURL) => {
	return isValidImage(sourceURL) ? sourceURL : IMAGES.defaultPlaceholder;
};
export const profileImageSource = (sourceURL) => {
	return isValidImage(sourceURL) ? sourceURL : IMAGES.profilePlaceholder;
};
export const companyImageSource = (sourceURL) => {
	return isValidImage(sourceURL) ? sourceURL : IMAGES.companyPlaceholder;
};
export const dateFormat = (dateString) => {
	if (dateString) {
		const dateObject = new Date(Date.parse(dateString));
		return dateObject.toDateString();
	}
	return '';
};
