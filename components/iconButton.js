import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from '../styles';

const IconButton = ({ iconUrl, onPress }) => {
	const handlePress = () => {
		if (onPress) {
			onPress();
		}
	};
	return (
		<TouchableOpacity style={styles.iconButton} onPress={handlePress}>
			<Image source={iconUrl} resizeMode="cover" style={styles.iconButtonImage} />
		</TouchableOpacity>
	);
};

export default IconButton;
