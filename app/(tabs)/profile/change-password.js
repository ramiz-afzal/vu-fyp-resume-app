import { SafeAreaView, Text, View, TextInput } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../components';
import styles from '../../../styles';
import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import axios from '../../../services/axios';

const ChangePasswordForm = () => {
	const router = useRouter();
	const schema = yup.object().shape({
		email: yup.string().email().required(),
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
		requestParams.email = data?.email || null;
		try {
			const response = await axios.post('/password/request', { ...requestParams });
			console.log(response);
			if (response && response.status == 200) {
				router.replace({ pathname: '/profile/verify-token' });
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
						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value} />} name="email" />
						{errors.email && errors.email.message && <Text style={styles.validationError}>{errors.email.message}</Text>}
						<Spacers />
						<AppButton label="Submit" type="primary" onPress={handleSubmit(onSubmit)} />
					</View>
				</Column>
			</Container>
		</SafeAreaView>
	);
};

export default ChangePasswordForm;
