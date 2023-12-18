import { useState } from 'react';
import { TextInput } from 'react-native';
import styles from '../styles';
const SearchElement = ({ onInput, onSubmit, placeholder = 'Search' }) => {
	const [value, setValue] = useState('');
	const onChangeText = (text) => {
		setValue(text);
		if (onInput) {
			onInput(text);
		}
	};
	const onSubmitEditing = (event) => {
		if (onSubmit) {
			onSubmit(event);
		}
	};
	return <TextInput style={styles.searchInput} value={value} onChangeText={onChangeText} placeholder={placeholder} onSubmitEditing={onSubmitEditing} />;
};

export default SearchElement;
