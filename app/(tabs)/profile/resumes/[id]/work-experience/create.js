import { useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Container, Column, AppButton, Spacers, DateTimePickerField } from '../../../../../../components';
import styles from '../../../../../../styles';
import React, { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateWorkExperience = () => {
	const [stillEmployed, setStillEmployed] = useState(true);
	const router = useRouter();
	const stillEmployedOptions = [
		{
			label: 'Yes',
			value: true,
		},
		{
			label: 'No',
			value: false,
		},
	];
	const schema = yup.object().shape({
		stillEmployed: yup.boolean().required('This field is required'),
		company: yup.string().required('This field is required'),
		designation: yup.string().required('This field is required'),
		startDate: yup.string().required('This field is required'),
		description: yup.string().required('This field is required'),
		endDate: yup
			.string()
			.test('stillEmployed', function (value) {
				const { stillEmployed } = this.parent;
				if (!stillEmployed || !value) return true;
				console.log('stillEmployed', stillEmployed);
				return stillEmployed == true ? false : true;
			})
			.required('This field is required'),
	});
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						<View>
							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Company" onBlur={onBlur} onChangeText={onChange} value={value} />} name="company" />
							{errors.company && errors.company.message && <Text style={styles.validationError}>{errors.company.message}</Text>}
							<Spacers />

							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Designation" onBlur={onBlur} onChangeText={onChange} value={value} />} name="designation" />
							{errors.designation && errors.designation.message && <Text style={styles.validationError}>{errors.designation.message}</Text>}
							<Spacers />

							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => <TextInput multiline={true} numberOfLines={10} style={{ ...styles.textInputField, textAlignVertical: 'top' }} placeholder="Description" onBlur={onBlur} onChangeText={onChange} value={value} />}
								name="description"
							/>
							{errors.description && errors.description.message && <Text style={styles.validationError}>{errors.description.message}</Text>}
							<Spacers />

							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<SelectDropdown
										defaultValue={stillEmployed}
										defaultButtonText={'Still Employed'}
										data={stillEmployedOptions}
										onBlur={onBlur}
										onSelect={(selectedItem, index) => {
											onChange(selectedItem.value);
											setStillEmployed(selectedItem.value);
										}}
										buttonTextAfterSelection={(selectedItem, index) => {
											return selectedItem.label;
										}}
										rowTextForSelection={(item, index) => {
											return item.label;
										}}
										buttonStyle={styles.dropDownWrapper}
										buttonTextStyle={styles.dropDownText}
									/>
								)}
								name="stillEmployed"
							/>
							{errors.stillEmployed && errors.stillEmployed.message && <Text style={styles.validationError}>{errors.stillEmployed.message}</Text>}
							<Spacers />

							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <DateTimePickerField placeholder="Start Date" onBlur={onBlur} onChange={onChange} value={value} />} name="startDate" />
							{errors.startDate && errors.startDate.message && <Text style={styles.validationError}>{errors.startDate.message}</Text>}
							<Spacers />

							{!stillEmployed && (
								<>
									<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <DateTimePickerField placeholder="End Date" onBlur={onBlur} onChange={onChange} value={value} />} name="endDate" />
									{errors.endDate && errors.endDate.message && <Text style={styles.validationError}>{errors.endDate.message}</Text>}
									<Spacers />
								</>
							)}

							<AppButton label="Save" type="primary" onPress={handleSubmit(onSubmit)} />
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateWorkExperience;
