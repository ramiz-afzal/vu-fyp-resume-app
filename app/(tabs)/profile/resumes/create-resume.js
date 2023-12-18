import { useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Container, Column, AppButton, Spacers, DateTimePickerField } from '../../../../components';
import styles from '../../../../styles';
import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateResume = () => {
	const router = useRouter();
	const genderSelectOptions = [
		{
			label: 'Male',
			value: 'male',
		},
		{
			label: 'Female',
			value: 'female',
		},
	];
	const martialStatusSelectOptions = [
		{
			label: 'Single',
			value: 'single',
		},
		{
			label: 'Married',
			value: 'married',
		},
	];
	const schema = yup.object().shape({
		firstName: yup.string().required('First Name is required'),
		lastName: yup.string().required('Last Name is required'),
		biography: yup.string().required('Biography is required'),
		designation: yup.string().required('Designation is required'),
		phone: yup.string().required('Phone is required'),
		gender: yup.string().required('Gender is required'),
		dob: yup.string().required('Date of Birth is required'),
		religion: yup.string().required('Religion is required'),
		martialStatus: yup.string().required('Martial Status is required'),
		address_1: yup.string().required('Address Line 1 is required'),
		address_2: yup.string(),
		city: yup.string().required('City is required'),
		state: yup.string().required('State is required'),
		country: yup.string().required('Country is required'),
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
		router.push({
			pathname: '/resumes/[id]/update-resume',
			params: {
				id: 123,
			},
		});
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						<View>
							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="First Name" onBlur={onBlur} onChangeText={onChange} value={value} />} name="firstName" />
							{errors.firstName && errors.firstName.message && <Text style={styles.validationError}>{errors.firstName.message}</Text>}
							<Spacers />
							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Last Name" onBlur={onBlur} onChangeText={onChange} value={value} />} name="lastName" />
							{errors.lastName && errors.lastName.message && <Text style={styles.validationError}>{errors.lastName.message}</Text>}
							<Spacers />
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => <TextInput multiline={true} numberOfLines={10} style={{ ...styles.textInputField, textAlignVertical: 'top' }} placeholder="Biography" onBlur={onBlur} onChangeText={onChange} value={value} />}
								name="biography"
							/>
							{errors.biography && errors.biography.message && <Text style={styles.validationError}>{errors.biography.message}</Text>}

							<Spacers height={30} />
							<Text style={styles.heading}>Personal Details</Text>
							<Spacers />

							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Designation" onBlur={onBlur} onChangeText={onChange} value={value} />} name="designation" />
							{errors.designation && errors.designation.message && <Text style={styles.validationError}>{errors.designation.message}</Text>}
							<Spacers />

							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Phone" onBlur={onBlur} onChangeText={onChange} value={value} />} name="phone" />
							{errors.phone && errors.phone.message && <Text style={styles.validationError}>{errors.phone.message}</Text>}
							<Spacers />

							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<SelectDropdown
										defaultButtonText={'Select Gender'}
										data={genderSelectOptions}
										onBlur={onBlur}
										onSelect={(selectedItem, index) => {
											onChange(selectedItem.value);
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
								name="gender"
							/>
							{errors.gender && errors.gender.message && <Text style={styles.validationError}>{errors.gender.message}</Text>}
							<Spacers />

							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <DateTimePickerField placeholder="Date of Birth" onBlur={onBlur} onChange={onChange} value={value} />} name="dob" />
							{errors.dob && errors.dob.message && <Text style={styles.validationError}>{errors.dob.message}</Text>}
							<Spacers />

							<Spacers />
							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Religion" onBlur={onBlur} onChangeText={onChange} value={value} />} name="religion" />
							{errors.religion && errors.religion.message && <Text style={styles.validationError}>{errors.religion.message}</Text>}
							<Spacers />

							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<SelectDropdown
										defaultButtonText={'Select Martial Status'}
										data={martialStatusSelectOptions}
										onBlur={onBlur}
										onSelect={(selectedItem, index) => {
											onChange(selectedItem.value);
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
								name="martialStatus"
							/>
							{errors.martialStatus && errors.martialStatus.message && <Text style={styles.validationError}>{errors.martialStatus.message}</Text>}

							<Spacers height={30} />
							<Text style={styles.heading}>Address Details</Text>
							<Spacers />
							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Address Line 1" onBlur={onBlur} onChangeText={onChange} value={value} />} name="address_1" />
							{errors.address_1 && errors.address_1.message && <Text style={styles.validationError}>{errors.address_1.message}</Text>}
							<Spacers />
							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Address Line 2" onBlur={onBlur} onChangeText={onChange} value={value} />} name="address_2" />
							{errors.address_2 && errors.address_2.message && <Text style={styles.validationError}>{errors.address_2.message}</Text>}
							<Spacers />
							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="City" onBlur={onBlur} onChangeText={onChange} value={value} />} name="city" />
							{errors.city && errors.city.message && <Text style={styles.validationError}>{errors.city.message}</Text>}
							<Spacers />
							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="State" onBlur={onBlur} onChangeText={onChange} value={value} />} name="state" />
							{errors.state && errors.state.message && <Text style={styles.validationError}>{errors.state.message}</Text>}
							<Spacers />
							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Country" onBlur={onBlur} onChangeText={onChange} value={value} />} name="country" />
							{errors.country && errors.country.message && <Text style={styles.validationError}>{errors.country.message}</Text>}
							<Spacers />
							<AppButton label="Save & Continue" type="primary" onPress={handleSubmit(onSubmit)} />
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateResume;
