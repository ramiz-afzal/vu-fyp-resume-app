import { SafeAreaView, Text, View, TextInput } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../components';
import styles from '../../../styles';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from '../../../services/axios';
import { useLocalSearchParams, useRouter } from 'expo-router';

const ForgotPasswordForm = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const schema = yup.object().shape({
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
		let requestParams = {};
		requestParams.resetToken = params?.resetToken || null;
		requestParams.password = data?.password || null;
		requestParams.confirmPassword = data?.confirmPassword || null;
		try {
			const response = await axios.post('/password/reset', { ...requestParams });
			if (response && response.status == 204) {
				router.replace({ pathname: '/profile' });
				alert('Password changed successfully!');
			}
		} catch (error) {
			console.log(error);
			console.log(error?.response?.data);
			alert('Something went wrong.');
		}
	};

	return (
		<SafeAreaView style={styles.screen}>
			<Container>
				<Column>
					<View style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Password" onBlur={onBlur} onChangeText={onChange} value={value} />} name="password" />
						{errors.password && errors.password.message && <Text style={styles.validationError}>{errors.password.message}</Text>}
						<Spacers />

						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Confirm Password" onBlur={onBlur} onChangeText={onChange} value={value} />} name="confirmPassword" />
						{errors.confirmPassword && errors.confirmPassword.message && <Text style={styles.validationError}>{errors.confirmPassword.message}</Text>}
						<Spacers />

						<AppButton label="Update Password" type="primary" onPress={handleSubmit(onSubmit)} />
					</View>
				</Column>
			</Container>
		</SafeAreaView>
	);
};

export default ForgotPasswordForm;
