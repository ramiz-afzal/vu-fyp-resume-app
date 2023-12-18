import { useState } from 'react';
import { TextInput } from 'react-native';
import styles from '../styles';

const AppTextInput = ({ placeholder = '' }) => {
	const [isFocused, setIsFocused] = useState(false);
	const [value, setValue] = useState('');
	return <TextInput style={styles.inputField(isFocused)} value={value} onChangeText={(text) => setValue(text)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={placeholder} />;
};

export default AppTextInput;
