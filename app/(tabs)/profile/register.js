import { SafeAreaView, ScrollView, Text, View, TextInput } from 'react-native';
import { Link, useRouter } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown';
import { Container, Column, AppButton, Spacers, DateTimePickerField } from '../../../components';
import styles from '../../../styles';
import React from 'react';
import axios from '../../../services/axios';
import authService from '../../../services/auth';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const RegisterForm = () => {
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
	const accountTypeSelectOptions = [
		{
			label: 'Basic',
			value: 'basic',
		},
		{
			label: 'Professional',
			value: 'professional',
		},
	];
	const schema = yup.object().shape({
		firstName: yup.string().required('First Name is required'),
		lastName: yup.string().required('Last Name is required'),
		gender: yup.string().required('Gender is required'),
		dob: yup.string().required('Date of Birth is required'),
		accountType: yup.string().required('Account Type is required'),
		email: yup.string().required('Email is required').email('Invalid email address'),
		password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
		confirmPassword: yup
			.string()
			.required('Confirm Password is required')
			.oneOf([yup.ref('password'), null], 'Passwords do not match'),
	});
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		reqFields = {};
		reqFields.firstName = data?.firstName || null;
		reqFields.lastName = data?.lastName || null;
		reqFields.gender = data?.gender || null;
		reqFields.dob = data?.dob || null;
		reqFields.accountType = data?.accountType || null;
		reqFields.email = data?.email || null;
		reqFields.password = data?.password || null;
		reqFields.confirmPassword = data?.confirmPassword || null;
		const response = await axios.post('/users', reqFields);
		if (response && response.status == 200) {
			await authService.setLogin(reqFields.email, reqFields.password);
			router.replace('/profile');
		}
		console.log(response);
	};

	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="First Name" onBlur={onBlur} onChangeText={onChange} value={value} />} name="firstName" />
						{errors.firstName && errors.firstName.message && <Text style={styles.validationError}>{errors.firstName.message}</Text>}
						<Spacers />

						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Last Name" onBlur={onBlur} onChangeText={onChange} value={value} />} name="lastName" />
						{errors.lastName && errors.lastName.message && <Text style={styles.validationError}>{errors.lastName.message}</Text>}
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

						<Controller
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<SelectDropdown
									defaultButtonText={'Select Account Type'}
									data={accountTypeSelectOptions}
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
							name="accountType"
						/>
						{errors.accountType && errors.accountType.message && <Text style={styles.validationError}>{errors.accountType.message}</Text>}
						<Spacers />

						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value} />} name="email" />
						{errors.email && errors.email.message && <Text style={styles.validationError}>{errors.email.message}</Text>}
						<Spacers />

						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Password" onBlur={onBlur} onChangeText={onChange} value={value} />} name="password" />
						{errors.password && errors.password.message && <Text style={styles.validationError}>{errors.password.message}</Text>}
						<Spacers />

						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Confirm Password" onBlur={onBlur} onChangeText={onChange} value={value} />} name="confirmPassword" />
						{errors.confirmPassword && errors.confirmPassword.message && <Text style={styles.validationError}>{errors.confirmPassword.message}</Text>}
						<Spacers />

						<AppButton label="Submit" type="primary" onPress={handleSubmit(onSubmit)} />
						<Spacers />

						<View style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center' }}>
							<Link style={styles.linkText('center')} href="/profile/login">
								Login Instead
							</Link>
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default RegisterForm;
