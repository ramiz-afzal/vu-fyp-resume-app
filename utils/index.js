import { IMAGES, ASSETS_BASE_URL } from '../constants';
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
	return isValidImage(sourceURL) ? sourceURL : isValidImage(`${ASSETS_BASE_URL}${sourceURL}`) ? { uri: `${ASSETS_BASE_URL}${sourceURL}` } : IMAGES.profilePlaceholder;
};
export const companyImageSource = (sourceURL) => {
	return isValidImage(sourceURL) ? sourceURL : isValidImage(`${ASSETS_BASE_URL}${sourceURL}`) ? { uri: `${ASSETS_BASE_URL}${sourceURL}` } : IMAGES.companyPlaceholder;
};
export const dateFormat = (dateString) => {
	if (dateString) {
		const dateObject = new Date(Date.parse(dateString));
		return dateObject.toDateString();
	}
	return '';
};
export const getResumeFullName = (resume) => {
	let resumeFullName = '';
	let firstName = '';
	let lastName = '';
	if (resume && resume.meta) {
		resume.meta.forEach((item) => {
			if (item.key == 'first_name') {
				firstName = item.value;
			} else if (item.key == 'last_name') {
				lastName = item.value;
			}
		});
	}

	resumeFullName = firstName && lastName ? `${firstName} ${lastName}` : firstName ? firstName : '';
	return resumeFullName;
};
export const getResumeMeta = (resume, metaKey) => {
	let metaValue = '';
	if (metaKey && resume && resume.meta) {
		resume.meta.forEach((item) => {
			if (item.key == metaKey) {
				metaValue = item.value;
			}
		});
	}
	return metaValue;
};
