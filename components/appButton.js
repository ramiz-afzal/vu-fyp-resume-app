import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

const AppButton = ({ label = 'Label', type = 'basic', onPress, disabled = false }) => {
	const handlePress = () => {
		if (onPress) {
			onPress();
		}
	};

	let btnStyles = {};
	let btnTextStyles = {};
	if (type == 'basic') {
		btnStyles = styles.basicButton;
		btnTextStyles = styles.basicButtonText;
	} else if (type == 'primary') {
		btnStyles = styles.primaryButton;
		btnTextStyles = styles.primaryButtonText;
	} else if (type == 'danger') {
		btnStyles = styles.dangerButton;
		btnTextStyles = styles.dangerButtonText;
	}

	return (
		<TouchableOpacity style={btnStyles} onPress={handlePress} disabled={disabled}>
			<Text style={btnTextStyles}>{label}</Text>
		</TouchableOpacity>
	);
};

export default AppButton;
