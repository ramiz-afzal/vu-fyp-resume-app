import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Container, Column, AppButton, Spacers, DateTimePickerField } from '../../../../../../../components';
import styles from '../../../../../../../styles';
import { COLORS } from '../../../../../../../constants';
import React, { useState, useEffect } from 'react';
import authService from '../../../../../../../services/auth';
import axios from '../../../../../../../services/axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const UpdateWorkExperience = () => {
	const params = useLocalSearchParams();
	const [experience, setExperience] = useState({});
	const [experienceLoaded, setExperienceLoaded] = useState(false);
	const [companiesLoaded, setCompaniesLoaded] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [stillEmployed, setStillEmployed] = useState(true);
	const router = useRouter();

	async function getExperience(resumeId, experienceId) {
		resumeId = parseInt(resumeId);
		experienceId = parseInt(experienceId);
		try {
			const token = await authService.getBearerToken();
			const response = await axios.get(`/resume/${resumeId}/experience/${experienceId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.experience) {
				setExperience(response.data.experience);
				setExperienceLoaded(true);
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
			getExperience(resumeId, itemId);
		}
	}, []);

	async function getCompanies() {
		try {
			const response = await axios.get(`/company`);
			if (response && response.status == 200 && response.data.companies) {
				setCompanies(response.data.companies.map((company) => ({ label: company.title, value: company.id })));
				setCompaniesLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	}

	const getCompanyTitle = (companyId) => {
		let label = '';
		if (companies) {
			companies.forEach((item) => {
				if (item.value == companyId) {
					label = item.label;
				}
			});
		}
		return label;
	};

	useEffect(() => {
		if (companiesLoaded == false) {
			getCompanies();
		}
	}, []);

	const stillEmployedOptions = [
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
		stillEmployed: yup.boolean().required('This field is required'),
		company: yup.string().required('This field is required'),
		designation: yup.string().required('This field is required'),
		startDate: yup.string().required('This field is required'),
		description: yup.string().required('This field is required'),
		endDate: yup.string().when('stillEmployed', {
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
		setValue('stillEmployed', experience.stillEmployed);
		setValue('company', experience?.company?.id || '');
		setValue('designation', experience.designation || '');
		setValue('description', experience.description || '');
		setValue('startDate', experience.startDate || '');
		setValue('endDate', experience.endDate || '');
	}, [experience]);

	const onSubmit = async (data) => {
		let requestParams = {};
		requestParams.stillEmployed = data.stillEmployed;
		requestParams.company = data?.company || null;
		requestParams.designation = data?.designation || null;
		requestParams.description = data?.description || null;
		requestParams.startDate = data?.startDate || null;
		requestParams.endDate = data?.endDate || null;

		try {
			const resumeId = params.id;
			const itemId = params.itemId;
			const token = await authService.getBearerToken();
			const response = await axios.patch(
				`/resume/${resumeId}/experience/${itemId}`,
				{ body: requestParams },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.experience) {
				alert('Updated Successful');
				setExperience(response.data.experience);
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
			const response = await axios.delete(`/resume/${resumeId}/experience/${itemId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.experience) {
				alert('Deleted Successful');
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
						{experienceLoaded && companiesLoaded ? (
							<View>
								<Controller
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<SelectDropdown
											defaultValue={value}
											defaultButtonText={getCompanyTitle(value) || 'Select Company'}
											data={companies}
											onBlur={onBlur}
											onSelect={(selectedItem, index) => {
												onChange(selectedItem.value);
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
									name="company"
								/>
								{errors.company && errors.company.message && <Text style={styles.validationError}>{errors.company.message}</Text>}
								<Spacers />

								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Designation" onBlur={onBlur} onChangeText={onChange} value={value} />} name="designation" />
								{errors.designation && errors.designation.message && <Text style={styles.validationError}>{errors.designation.message}</Text>}
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
											defaultButtonText={value ? 'Yes' : 'No' || 'Still Employed'}
											data={stillEmployedOptions}
											onBlur={onBlur}
											onSelect={(selectedItem, index) => {
												onChange(selectedItem.value);
												setStillEmployed(selectedItem.value);
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
									name="stillEmployed"
								/>
								{errors.stillEmployed && errors.stillEmployed.message && <Text style={styles.validationError}>{errors.stillEmployed.message}</Text>}
								<Spacers />

								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <DateTimePickerField placeholder="Start Date" onBlur={onBlur} onChange={onChange} value={value} />} name="startDate" />
								{errors.startDate && errors.startDate.message && <Text style={styles.validationError}>{errors.startDate.message}</Text>}
								<Spacers />

								{!stillEmployed && (
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
						) : (
							<ActivityIndicator size={'large'} color={COLORS.accent} />
						)}
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default UpdateWorkExperience;
