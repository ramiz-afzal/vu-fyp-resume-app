import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../../../../../components';
import styles from '../../../../../../../styles';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import authService from '../../../../../../../services/auth';
import axios from '../../../../../../../services/axios';
import { COLORS } from '../../../../../../../constants';

const UpdateService = () => {
	const params = useLocalSearchParams();
	const [service, setService] = useState({});
	const [serviceLoaded, setServiceLoaded] = useState(false);
	const router = useRouter();

	async function getService(companyId, serviceId) {
		companyId = parseInt(companyId);
		serviceId = parseInt(serviceId);
		try {
			const token = await authService.getBearerToken();
			const response = await axios.get(`/company/${companyId}/service/${serviceId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.service) {
				setService(response.data.service);
				setServiceLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	}

	useEffect(() => {
		const companyId = params.id;
		const itemId = params.itemId;
		if (companyId && itemId) {
			getService(companyId, itemId);
		}
	}, []);

	const schema = yup.object().shape({
		title: yup.string().required('This field is required'),
		description: yup.string().required('This field is required'),
	});
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		setValue('title', service?.title || '');
		setValue('description', service?.description || '');
	}, [service]);

	const onSubmit = async (data) => {
		let requestParams = {};
		requestParams.title = data?.title || null;
		requestParams.description = data?.description || null;

		try {
			const companyId = params.id;
			const itemId = params.itemId;
			const token = await authService.getBearerToken();
			const response = await axios.patch(
				`/company/${companyId}/service/${itemId}`,
				{ body: requestParams },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.service) {
				alert('Updated Successful');
				setService(response.data.service);
				router.replace(`/profile/companies/${companyId}/update-company`);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	};

	async function deleteItem() {
		try {
			const companyId = params.id;
			const itemId = params.itemId;
			const token = await authService.getBearerToken();
			const response = await axios.delete(`/company/${companyId}/service/${itemId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.service) {
				alert('Updated Successful');
				router.replace(`/profile/companies/${companyId}/update-company`);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	}

	const onDelete = async () => {
		Alert.alert('Confirm', 'Are you sure you want to delete this item?', [
			{
				text: 'Cancel',
				style: 'cancel',
			},
			{
				text: 'Delete',
				style: 'destructive',
				onPress: deleteItem,
			},
		]);
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						{serviceLoaded ? (
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
								<Spacers />
								<AppButton label="Delete" type="danger" onPress={onDelete} />
							</View>
						) : (
							<ActivityIndicator size={'large'} color={COLORS.accent} />
						)}
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default UpdateService;
