const COLORS = {
	// basic
	primary: '#312651',
	secondary: '#444262',
	accent: '#85a3ff',

	// grays
	coolGray: '#83829A',
	frenchGray: '#C1C0C8',
	black: '#000000',

	// whites
	mutedWhite: '#F3F4F8',
	lightWhite: '#FAFAFC',
	white: '#FFFFFF',

	// alerts
	errorDark: '#c7254e',
	errorLight: '#f9f2f4',
};

const FONT = {
	regular: 'DMRegular',
	medium: 'DMMedium',
	bold: 'DMBold',
};

const SIZES = {
	xSmall: 10,
	small: 12,
	medium: 16,
	large: 20,
	xLarge: 24,
	xxLarge: 32,
};

const SHADOWS = {
	small: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 2,
	},
	medium: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 5.84,
		elevation: 5,
	},
};

export { COLORS, FONT, SIZES, SHADOWS };
