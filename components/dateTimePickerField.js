import React, { useState } from 'react';
import { TextInput, Pressable, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles';

const DateTimePickerField = ({ onChange, onBlur, value, display = 'default', mode = 'date', is24Hour = true, placeholder = '' }) => {
	const currentDate = new Date();
	const [date, setDate] = useState('');
	const [visible, setVisible] = useState(false);
	const showDatePicker = () => {
		setVisible(true);
	};
	const hideDatePicker = () => {
		setVisible(false);
	};
	const onDatePickerChange = ({ type }, selectedDate) => {
		hideDatePicker();
		if (type == 'set') {
			if (Platform.OS == 'android') {
				setDate(selectedDate.toDateString());
				onChange(selectedDate);
			}
		} else {
			if (onBlur) {
				onBlur();
			}
		}
	};
	return (
		<>
			{visible && <DateTimePicker value={value || currentDate} mode={mode} is24Hour={is24Hour} display={display} onChange={onDatePickerChange} />}
			<Pressable onPress={showDatePicker}>
				<TextInput style={styles.textInputField} placeholder={placeholder} value={date} editable={false} />
			</Pressable>
		</>
	);
};

export default DateTimePickerField;
