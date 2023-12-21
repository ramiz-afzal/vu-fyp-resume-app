import { SafeAreaView, Text, View, TextInput, ScrollView } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../../../../components';
import styles from '../../../../../../styles';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import authService from '../../../../../../services/auth';
import axios from '../../../../../../services/axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
const CreateDepartment = () => {
	const params = useLocalSearchParams();
	const router = useRouter();
	const schema = yup.object().shape({
		title: yup.string().required('This field is required'),
		description: yup.string().required('This field is required'),
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
				`/company/${params.id}/department`,
				{ ...requestParams },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.department) {
				alert('Department Added!');
				router.replace(`/profile/companies/${params.id}/update-company`);
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
							<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Title" onBlur={onBlur} onChangeText={onChange} value={value} />} name="title" />
							{errors.title && errors.title.message && <Text style={styles.validationError}>{errors.title.message}</Text>}
							<Spacers />

							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => <TextInput multiline={true} numberOfLines={10} style={{ ...styles.textInputField, textAlignVertical: 'top' }} placeholder="Description" onBlur={onBlur} onChangeText={onChange} value={value} />}
								name="description"
							/>
							{errors.description && errors.description.message && <Text style={styles.validationError}>{errors.description.message}</Text>}
							<Spacers />

							<AppButton label="Save" type="primary" onPress={handleSubmit(onSubmit)} />
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateDepartment;
