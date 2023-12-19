import React, { useState, useEffect } from 'react';
import { TextInput, Pressable, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles';
import { dateFormat } from '../utils';

const DateTimePickerField = ({ onChange, onBlur, value, display = 'default', mode = 'date', is24Hour = true, placeholder = '' }) => {
	const [date, setDate] = useState('');
	const [datePickerValue, setDatePickerValue] = useState(new Date());
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (value) {
			const valueDate = new Date(Date.parse(value));
			setDate(dateFormat(value));
			setDatePickerValue(valueDate);
		}
	}, []);

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
				setDate(dateFormat(selectedDate));
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
			{visible && <DateTimePicker value={datePickerValue} mode={mode} is24Hour={is24Hour} display={display} onChange={onDatePickerChange} />}
			<Pressable onPress={showDatePicker}>
				<TextInput style={styles.textInputField} placeholder={placeholder} value={date} editable={false} />
			</Pressable>
		</>
	);
};

export default DateTimePickerField;
