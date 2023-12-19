import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../../../../../components';
import styles from '../../../../../../../styles';
import { COLORS } from '../../../../../../../constants';
import React, { useEffect, useState } from 'react';
import authService from '../../../../../../../services/auth';
import axios from '../../../../../../../services/axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const UpdateCertificate = () => {
	const params = useLocalSearchParams();
	const [certificate, setCertificate] = useState({});
	const [certificateLoaded, setCertificateLoaded] = useState(false);
	const router = useRouter();

	async function getCertificate(resumeId, certificateId) {
		resumeId = parseInt(resumeId);
		certificateId = parseInt(certificateId);
		try {
			const token = await authService.getBearerToken();
			const response = await axios.get(`/resume/${resumeId}/certificate/${certificateId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.certificate) {
				setCertificate(response.data.certificate);
				setCertificateLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	}

	useEffect(() => {
		const resumeId = params.id;
		const itemId = params.itemId;
		if (resumeId && itemId) {
			getCertificate(resumeId, itemId);
		}
	}, []);

	const schema = yup.object().shape({
		title: yup.string().required('This field is required'),
		institute: yup.string().required('This field is required'),
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
		setValue('title', certificate?.title || '');
		setValue('institute', certificate?.institute || '');
		setValue('description', certificate?.description || '');
	}, [certificate]);

	const onSubmit = async (data) => {
		let requestParams = {};
		requestParams.title = data?.title || null;
		requestParams.institute = data?.institute || null;
		requestParams.description = data?.description || null;

		try {
			const resumeId = params.id;
			const itemId = params.itemId;
			const token = await authService.getBearerToken();
			const response = await axios.patch(
				`/resume/${resumeId}/certificate/${itemId}`,
				{ body: requestParams },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.certificate) {
				alert('Updated Successful');
				setCertificate(response.data.certificate);
				router.replace(`/profile/resumes/${resumeId}/update-resume`);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	};

	async function deleteItem() {
		try {
			const resumeId = params.id;
			const itemId = params.itemId;
			const token = await authService.getBearerToken();
			const response = await axios.delete(`/resume/${resumeId}/certificate/${itemId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.certificate) {
				alert('Updated Successful');
				router.replace(`/profile/resumes/${resumeId}/update-resume`);
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
						{certificateLoaded ? (
							<View>
								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Title" onBlur={onBlur} onChangeText={onChange} value={value} />} name="title" />
								{errors.title && errors.title.message && <Text style={styles.validationError}>{errors.title.message}</Text>}
								<Spacers />

								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Institute" onBlur={onBlur} onChangeText={onChange} value={value} />} name="institute" />
								{errors.institute && errors.institute.message && <Text style={styles.validationError}>{errors.institute.message}</Text>}
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

export default UpdateCertificate;
