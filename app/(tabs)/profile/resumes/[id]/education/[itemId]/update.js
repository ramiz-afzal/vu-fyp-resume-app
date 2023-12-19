import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Container, Column, AppButton, Spacers, DateTimePickerField } from '../../../../../../../components';
import styles from '../../../../../../../styles';
import { COLORS } from '../../../../../../../constants';
import React, { useEffect, useState } from 'react';
import authService from '../../../../../../../services/auth';
import axios from '../../../../../../../services/axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const UpdateEducation = () => {
	const params = useLocalSearchParams();
	const [education, setEducation] = useState({});
	const [educationLoaded, setEducationLoaded] = useState(false);
	const [isInProcess, setIsInProcess] = useState(true);
	const router = useRouter();

	async function getEducation(resumeId, educationId) {
		resumeId = parseInt(resumeId);
		educationId = parseInt(educationId);
		try {
			const token = await authService.getBearerToken();
			const response = await axios.get(`/resume/${resumeId}/education/${educationId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.education) {
				setEducation(response.data.education);
				setEducationLoaded(true);
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
			getEducation(resumeId, itemId);
		}
	}, []);

	const inProcessOptions = [
		{
			label: 'Yes',
			value: true,
		},
		{
			label: 'No',
			value: false,
		},
	];
	const schema = yup.object().shape({
		inProcess: yup.boolean().required('This field is required'),
		institute: yup.string().required('This field is required'),
		degree: yup.string().required('This field is required'),
		startDate: yup.string().required('This field is required'),
		description: yup.string().required('This field is required'),
		endDate: yup.string().when('inProcess', {
			is: true,
			then: () => yup.string(),
			otherwise: () => yup.string().required('This field is required'),
		}),
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
		setValue('inProcess', education.inProcess);
		setValue('institute', education?.institute || '');
		setValue('degree', education?.degree || '');
		setValue('description', education?.description || '');
		setValue('startDate', education?.startDate || '');
		setValue('endDate', education?.endDate || '');
	}, [education]);

	const onSubmit = async (data) => {
		let requestParams = {};
		requestParams.inProcess = data.inProcess;
		requestParams.institute = data?.institute || null;
		requestParams.degree = data?.degree || null;
		requestParams.description = data?.description || null;
		requestParams.startDate = data?.startDate || null;
		requestParams.endDate = data?.endDate || null;

		try {
			const resumeId = params.id;
			const itemId = params.itemId;
			const token = await authService.getBearerToken();
			const response = await axios.patch(
				`/resume/${resumeId}/education/${itemId}`,
				{ body: requestParams },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.education) {
				alert('Updated Successful');
				setEducation(response.data.education);
				router.replace(`/profile/resumes/${resumeId}/update-resume`);
			}
		} catch (error) {
			console.log(error);
			console.log(error.message);
			alert('Something went wrong.');
		}
	};

	async function deleteItem() {
		try {
			const resumeId = params.id;
			const itemId = params.itemId;
			const token = await authService.getBearerToken();
			const response = await axios.delete(`/resume/${resumeId}/education/${itemId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.education) {
				alert('Updated Successful');
				router.replace(`/profile/resumes/${resumeId}/update-resume`);
			}
		} catch (error) {
			console.log(error);
			console.log(error.message);
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
						{!educationLoaded ? (
							<ActivityIndicator size={'large'} color={COLORS.accent} />
						) : (
							<View>
								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Institute" onBlur={onBlur} onChangeText={onChange} value={value} />} name="institute" />
								{errors.institute && errors.institute.message && <Text style={styles.validationError}>{errors.institute.message}</Text>}
								<Spacers />

								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Degree" onBlur={onBlur} onChangeText={onChange} value={value} />} name="degree" />
								{errors.degree && errors.degree.message && <Text style={styles.validationError}>{errors.degree.message}</Text>}
								<Spacers />

								<Controller
									control={control}
									render={({ field: { onChange, onBlur, value } }) => <TextInput multiline={true} numberOfLines={10} style={{ ...styles.textInputField, textAlignVertical: 'top' }} placeholder="Description" onBlur={onBlur} onChangeText={onChange} value={value} />}
									name="description"
								/>
								{errors.description && errors.description.message && <Text style={styles.validationError}>{errors.description.message}</Text>}
								<Spacers />

								<Controller
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<SelectDropdown
											defaultValue={value}
											defaultButtonText={value ? 'Yes' : 'No' || 'Under Process'}
											data={inProcessOptions}
											onBlur={onBlur}
											onSelect={(selectedItem, index) => {
												onChange(selectedItem.value);
												setIsInProcess(selectedItem.value);
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
									name="inProcess"
								/>
								{errors.inProcess && errors.inProcess.message && <Text style={styles.validationError}>{errors.inProcess.message}</Text>}
								<Spacers />

								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <DateTimePickerField placeholder="Start Date" onBlur={onBlur} onChange={onChange} value={value} />} name="startDate" />
								{errors.startDate && errors.startDate.message && <Text style={styles.validationError}>{errors.startDate.message}</Text>}
								<Spacers />

								{!isInProcess && (
									<>
										<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <DateTimePickerField placeholder="End Date" onBlur={onBlur} onChange={onChange} value={value} />} name="endDate" />
										{errors.endDate && errors.endDate.message && <Text style={styles.validationError}>{errors.endDate.message}</Text>}
										<Spacers />
									</>
								)}

								<AppButton label="Save" type="primary" onPress={handleSubmit(onSubmit)} />
								<Spacers />
								<AppButton label="Delete" type="danger" onPress={onDelete} />
							</View>
						)}
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default UpdateEducation;
