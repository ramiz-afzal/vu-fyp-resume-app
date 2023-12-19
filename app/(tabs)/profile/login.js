import { SafeAreaView, Text, View, TextInput, Button, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Container, Column, AppButton, Spacers } from '../../../components';
import styles from '../../../styles';
import React, { useState } from 'react';
import authService from '../../../services/auth';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const LoginForm = () => {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState(null);
	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().required(),
	});
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = ({ email, password }) => {
		let loginStatus = authService.setLogin(email, password);
		if (loginStatus) {
			router.replace('/home');
		}
	};

	return (
		<SafeAreaView style={styles.screen}>
			<Container>
				<Column>
					<View style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value} />} name="email" />
						{errors.email && errors.email.message && <Text style={styles.validationError}>{errors.email.message}</Text>}
						<Spacers />
						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Password" onBlur={onBlur} onChangeText={onChange} value={value} />} name="password" />
						{errors.password && errors.password.message && <Text style={styles.validationError}>{errors.password.message}</Text>}
						<Spacers />
						<AppButton label="Submit" type="primary" onPress={handleSubmit(onSubmit)} />
						<Spacers />
						{errorMessage && (
							<>
								<Text style={styles.validationError}>{errorMessage}</Text>
								<Spacers />
							</>
						)}
						<View style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
							<Link style={styles.linkText('left')} href="/profile/forgot-password">
								Forgot Password
							</Link>
							<Link style={styles.linkText('right')} href="/profile/register">
								Register an account
							</Link>
						</View>
					</View>
				</Column>
			</Container>
		</SafeAreaView>
	);
};

export default LoginForm;
