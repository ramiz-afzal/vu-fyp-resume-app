import { SafeAreaView, Text, View, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { Container, Column, AppButton, Spacers } from '../../../components';
import styles from '../../../styles';
import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const ForgotPasswordForm = () => {
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
	const onSubmit = (data) => console.log(data);

	return (
		<SafeAreaView style={styles.screen}>
			<Container>
				<Column>
					<View style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
						<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value} />} name="email" />
						{errors.email && errors.email.message && <Text style={styles.validationError}>{errors.email.message}</Text>}
						<Spacers />
						<AppButton label="Submit" type="primary" onPress={handleSubmit(onSubmit)} />
						<Spacers />
						<View style={{ width: '100%', maxWidth: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'center' }}>
							<Link style={styles.linkText('center')} href="/profile/login">
								Login instead
							</Link>
						</View>
					</View>
				</Column>
			</Container>
		</SafeAreaView>
	);
};

export default ForgotPasswordForm;
