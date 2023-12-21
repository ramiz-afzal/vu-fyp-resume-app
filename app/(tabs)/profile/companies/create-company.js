import { useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../../components';
import styles from '../../../../styles';
import React from 'react';
import authService from '../../../../services/auth';
import axios from '../../../../services/axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateCompany = () => {
	const router = useRouter();
	const schema = yup.object().shape({
		title: yup.string().required('Company Title is required'),
		description: yup.string().required('Company Description is required'),
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
		requestParams.title = data?.title || null;
		requestParams.description = data?.description || null;
		try {
			const token = await authService.getBearerToken();
			const response = await axios.post(
				'/company',
				{ ...requestParams },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.company) {
				router.replace({
					pathname: '/companies/[id]/update-company',
					params: {
						id: response.data.company.id,
					},
				});
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						<View>
							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Company Title" onBlur={onBlur} onChangeText={onChange} value={value} />} name="title" />
							{errors.title && errors.title.message && <Text style={styles.validationError}>{errors.title.message}</Text>}
							<Spacers />

							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => <TextInput multiline={true} numberOfLines={10} style={{ ...styles.textInputField, textAlignVertical: 'top' }} placeholder="Company Description" onBlur={onBlur} onChangeText={onChange} value={value} />}
								name="description"
							/>
							{errors.description && errors.description.message && <Text style={styles.validationError}>{errors.description.message}</Text>}
							<Spacers />

							<AppButton label="Save & Continue" type="primary" onPress={handleSubmit(onSubmit)} />
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateCompany;
