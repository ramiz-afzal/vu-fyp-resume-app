import { useLocalSearchParams, useRouter } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown';
import { SafeAreaView, Text, View, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Container, Column, AppButton, Spacers, DateTimePickerField } from '../../../../../../../../../components';
import styles from '../../../../../../../../../styles';
import { COLORS } from '../../../../../../../../../constants';
import { getResumeFullName } from '../../../../../../../../../utils';
import React, { useEffect, useMemo, useState } from 'react';
import authService from '../../../../../../../../../services/auth';
import axios from '../../../../../../../../../services/axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const UpdateEmployee = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const companyId = params.id || null;
	const departmentId = params.itemId || null;
	const employeeId = params.employeeId || null;
	const [employeeType, setEmployeeType] = useState('');
	const [resumes, setResumes] = useState([]);
	const [resumesLoaded, setResumesLoaded] = useState(false);
	const [employee, setEmployee] = useState({});
	const [employeeLoaded, setEmployeeLoaded] = useState(false);
	const [illiterateEmployee, setIlliterateEmployee] = useState({});
	const employeeTypeOptions = [
		{
			label: 'Educated',
			value: 'educated',
		},
		{
			label: 'Illiterate',
			value: 'illiterate',
		},
	];
	const employmentTypeOptions = [
		{
			label: 'Working',
			value: 'working',
		},
		{
			label: 'Former',
			value: 'former',
		},
	];
	const employmentPositionOptions = [
		{
			label: 'FullTime',
			value: 'fullTime',
		},
		{
			label: 'Part Time',
			value: 'partTime',
		},
		{
			label: 'Intern',
			value: 'intern',
		},
	];

	async function getResumes() {
		try {
			const response = await axios.get(`/resume`);
			if (response && response.status == 200 && response.data.resumes) {
				setResumes(response.data.resumes);
				setResumesLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	}
	async function getEmployee() {
		try {
			const token = await authService.getBearerToken();
			const response = await axios.get(`/company/${companyId}/department/${departmentId}/employee/${employeeId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.employee) {
				setEmployee(response.data.employee);
				setEmployeeType(response.data.employee.type);
				setEmployeeLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	}
	async function getIlliterateEmployee() {
		try {
			if (employeeLoaded && employee.type == 'illiterate' && employee.illiterateEmployee) {
				const token = await authService.getBearerToken();
				const response = await axios.get(`/illiterate-employee/${employee.illiterateEmployee.id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response && response.status == 200 && response.data.illiterateEmployee) {
					setIlliterateEmployee(response.data.illiterateEmployee);
				}
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	}

	// get resumes data
	useEffect(() => {
		getResumes();
		getEmployee();
	}, []);

	useEffect(() => {
		getIlliterateEmployee();
	}, [employeeLoaded]);

	const userResumes = useMemo(() => {
		let userResumes = [];
		if (resumes && resumes.length > 0) {
			resumes.forEach((resume) => {
				userResumes.push({
					label: getResumeFullName(resume),
					value: resume.id,
				});
			});
		}
		return userResumes;
	}, [resumes]);

	const schema = yup.object().shape({
		type: yup.string().required('This field is required').oneOf(['educated', 'illiterate'], `type should be a value between 'educated', 'illiterate'`),
		employmentType: yup.string().required('This field is required').oneOf(['working', 'former'], `employmentType should be a value between 'working', 'former'`),
		employmentPosition: yup.string().required('This field is required').oneOf(['fullTime', 'partTime', 'intern'], `employmentPosition should be a value between 'fullTime', 'partTime', 'intern'`),
		resumeId: yup.string().when('type', {
			is: 'educated',
			then: () => yup.string().required('This field is required'),
			otherwise: () => yup.string(),
		}),
		firstName: yup.string().when('type', {
			is: 'illiterate',
			then: () => yup.string().required('This field is required'),
			otherwise: () => yup.string(),
		}),
		lastName: yup.string().when('type', {
			is: 'illiterate',
			then: () => yup.string().required('This field is required'),
			otherwise: () => yup.string(),
		}),
		designation: yup.string().when('type', {
			is: 'illiterate',
			then: () => yup.string().required('This field is required'),
			otherwise: () => yup.string(),
		}),
		startDate: yup.string().when('type', {
			is: 'illiterate',
			then: () => yup.string().required('This field is required'),
			otherwise: () => yup.string(),
		}),
		endDate: yup.string().when('type', {
			is: 'illiterate',
			then: () => yup.string().required('This field is required'),
			otherwise: () => yup.string(),
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
		setValue('type', employee?.type || '');
		setValue('employmentType', employee?.employmentType || '');
		setValue('employmentPosition', employee?.employmentPosition || '');
		setValue('resumeId', employee?.resume?.id || '');
	}, [employee]);

	useEffect(() => {
		setValue('firstName', illiterateEmployee?.firstName || '');
		setValue('lastName', illiterateEmployee?.lastName || '');
		setValue('designation', illiterateEmployee?.designation || '');
		setValue('startDate', illiterateEmployee?.startDate || '');
		setValue('endDate', illiterateEmployee?.endDate || '');
	}, [illiterateEmployee]);

	const onSubmit = async (data) => {
		let requestParams = {};
		requestParams.type = data?.type || null;
		requestParams.resumeId = data?.resumeId || null;
		requestParams.employmentType = data?.employmentType || null;
		requestParams.employmentPosition = data?.employmentPosition || null;

		try {
			if (requestParams.type == 'illiterate') {
				let illiterateEmployeeArgs = {};
				illiterateEmployeeArgs.firstName = data?.firstName || null;
				illiterateEmployeeArgs.lastName = data?.lastName || null;
				illiterateEmployeeArgs.designation = data?.designation || null;
				illiterateEmployeeArgs.startDate = data?.startDate || null;
				illiterateEmployeeArgs.endDate = data?.endDate || null;

				const token = await authService.getBearerToken();
				await axios.patch(
					`/illiterate-employee/${illiterateEmployee.id}`,
					{ body: illiterateEmployeeArgs },
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
			}

			const token = await authService.getBearerToken();
			const response = await axios.patch(
				`/company/${companyId}/department/${departmentId}/employee/${employeeId}`,
				{ body: requestParams },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.employee) {
				alert('Employee Updated');
				router.replace({
					pathname: '/profile/companies/[id]/departments/[itemId]/update',
					params: {
						id: companyId,
						itemId: departmentId,
					},
				});
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	};

	async function deleteItem() {
		try {
			const token = await authService.getBearerToken();
			const response = await axios.delete(`/company/${companyId}/department/${departmentId}/employee/${employeeId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.employee) {
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
				{resumesLoaded && employeeLoaded ? (
					<Container>
						<Column>
							<View>
								<Controller
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<SelectDropdown
											disabled
											defaultValue={value}
											defaultButtonText={value == 'educated' ? 'Educated' : value == 'illiterate' ? 'Illiterate' : 'Employee Type'}
											data={employeeTypeOptions}
											onBlur={onBlur}
											onSelect={(selectedItem, index) => {
												onChange(selectedItem.value);
												setEmployeeType(selectedItem.value);
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
									name="type"
								/>
								{errors.type && errors.type.message && <Text style={styles.validationError}>{errors.type.message}</Text>}
								<Spacers />

								<Controller
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<SelectDropdown
											defaultValue={value}
											defaultButtonText={value == 'working' ? 'Working' : value == 'former' ? 'Former' : 'Employment Type'}
											data={employmentTypeOptions}
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
									name="employmentType"
								/>
								{errors.employmentType && errors.employmentType.message && <Text style={styles.validationError}>{errors.employmentType.message}</Text>}
								<Spacers />

								<Controller
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<SelectDropdown
											defaultValue={value}
											defaultButtonText={value == 'fullTime' ? 'Full Time' : value == 'partTime' ? 'Part Time' : value == 'intern' ? 'Intern' : 'Employment Position'}
											data={employmentPositionOptions}
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
									name="employmentPosition"
								/>
								{errors.employmentPosition && errors.employmentPosition.message && <Text style={styles.validationError}>{errors.employmentPosition.message}</Text>}
								<Spacers />
								{employeeType == 'educated' && (
									<Controller
										control={control}
										render={({ field: { onChange, onBlur, value } }) => (
											<SelectDropdown
												defaultValue={value}
												defaultButtonText={value ? getResumeFullName(employee.resume) : 'Select User'}
												data={userResumes}
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
												search
											/>
										)}
										name="resumeId"
									/>
								)}
								{employeeType == 'educated' && errors.resumeId && errors.resumeId.message && (
									<>
										<Text style={styles.validationError}>{errors.resumeId.message}</Text>
										<Spacers />
									</>
								)}

								{employeeType == 'illiterate' && (
									<>
										<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="First Name" onBlur={onBlur} onChangeText={onChange} value={value} />} name="firstName" />
										<Spacers />
									</>
								)}
								{employeeType == 'illiterate' && errors.firstName && errors.firstName.message && (
									<>
										<Text style={styles.validationError}>{errors.firstName.message}</Text>
										<Spacers />
									</>
								)}

								{employeeType == 'illiterate' && (
									<>
										<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Last Name" onBlur={onBlur} onChangeText={onChange} value={value} />} name="lastName" />
										<Spacers />
									</>
								)}
								{employeeType == 'illiterate' && errors.lastName && errors.lastName.message && (
									<>
										<Text style={styles.validationError}>{errors.lastName.message}</Text>
										<Spacers />
									</>
								)}

								{employeeType == 'illiterate' && (
									<>
										<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Designation" onBlur={onBlur} onChangeText={onChange} value={value} />} name="designation" />
										<Spacers />
									</>
								)}
								{employeeType == 'illiterate' && errors.designation && errors.designation.message && (
									<>
										<Text style={styles.validationError}>{errors.designation.message}</Text>
										<Spacers />
									</>
								)}

								{employeeType == 'illiterate' && (
									<>
										<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <DateTimePickerField placeholder="Start Date" onBlur={onBlur} onChange={onChange} value={value} />} name="startDate" />
										<Spacers />
									</>
								)}
								{employeeType == 'illiterate' && errors.startDate && errors.startDate.message && (
									<>
										<Text style={styles.validationError}>{errors.startDate.message}</Text>
										<Spacers />
									</>
								)}

								{employeeType == 'illiterate' && (
									<>
										<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <DateTimePickerField placeholder="End Date" onBlur={onBlur} onChange={onChange} value={value} />} name="endDate" />
										<Spacers />
									</>
								)}
								{employeeType == 'illiterate' && errors.endDate && errors.endDate.message && (
									<>
										<Text style={styles.validationError}>{errors.endDate.message}</Text>
										<Spacers />
									</>
								)}

								<Spacers />
								<AppButton label="Save" type="primary" onPress={handleSubmit(onSubmit)} />
								<Spacers />
								<AppButton label="Delete" type="danger" onPress={onDelete} />
							</View>
						</Column>
					</Container>
				) : (
					<ActivityIndicator color={COLORS.accent} size={'large'} />
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default UpdateEmployee;
