import { SafeAreaView, Text, View, TextInput } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../components';
import styles from '../../../styles';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from '../../../services/axios';
import { useRouter } from 'expo-router';

const VerifyPasswordToken = () => {
	const router = useRouter();
	const schema = yup.object().shape({
		token: yup.string().required('Reset token is required'),
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
		requestParams.resetToken = data?.token || null;
		try {
			const response = await axios.post('/password/validate-token', { ...requestParams });
			if (response && response.status == 200 && response.data.isValid == true) {
				router.replace({ pathname: '/profile/update-password', params: { resetToken: data.token } });
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
						<Text style={{ textAlign: 'center' }}>A reset password token has been sent to your email address</Text>
						<Spacers />

						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Reset Token" onBlur={onBlur} onChangeText={onChange} value={value} />} name="token" />
						{errors.token && errors.token.message && <Text style={styles.validationError}>{errors.token.message}</Text>}
						<Spacers />

						<AppButton label="Verify Token" type="primary" onPress={handleSubmit(onSubmit)} />
					</View>
				</Column>
			</Container>
		</SafeAreaView>
	);
};

export default VerifyPasswordToken;
