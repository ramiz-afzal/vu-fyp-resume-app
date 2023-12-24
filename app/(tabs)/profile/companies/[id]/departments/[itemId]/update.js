import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Container, Column, AppButton, Spacers, EmployeeEditCardFull } from '../../../../../../../components';
import styles from '../../../../../../../styles';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import authService from '../../../../../../../services/auth';
import axios from '../../../../../../../services/axios';
import { COLORS } from '../../../../../../../constants';

const UpdateDepartment = () => {
	const params = useLocalSearchParams();
	const [department, setDepartment] = useState({});
	const [departmentLoaded, setDepartmentLoaded] = useState(false);
	const router = useRouter();

	async function getDepartment(companyId, departmentId) {
		companyId = parseInt(companyId);
		departmentId = parseInt(departmentId);
		try {
			const token = await authService.getBearerToken();
			const response = await axios.get(`/company/${companyId}/department/${departmentId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.department) {
				setDepartment(response.data.department);
				setDepartmentLoaded(true);
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
			getDepartment(companyId, itemId);
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
		setValue('title', department?.title || '');
		setValue('description', department?.description || '');
	}, [department]);

	const onSubmit = async (data) => {
		let requestParams = {};
		requestParams.title = data?.title || null;
		requestParams.description = data?.description || null;

		try {
			const companyId = params.id;
			const itemId = params.itemId;
			const token = await authService.getBearerToken();
			const response = await axios.patch(
				`/company/${companyId}/department/${itemId}`,
				{ body: requestParams },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.department) {
				alert('Updated Successful');
				setDepartment(response.data.department);
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
			const response = await axios.delete(`/company/${companyId}/department/${itemId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.department) {
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

	const addEmployee = async () => {
		router.push({
			pathname: '/profile/companies/[id]/departments/[itemId]/employees/create',
			params: {
				id: params.id,
				itemId: department.id,
			},
		});
	};
	const editEmployee = async (employeeId) => {
		router.push({
			pathname: '/profile/companies/[id]/departments/[itemId]/employees/[employeeId]/update',
			params: {
				id: params.id,
				itemId: department.id,
				employeeId: employeeId,
			},
		});
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						{departmentLoaded ? (
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

								<Spacers height={30} />
								<Text style={styles.heading}>Employees</Text>
								<Spacers />
								{department.employee && department.employee.length ? department.employee.map((item, index) => <EmployeeEditCardFull item={item} key={index} onButtonPress={() => editEmployee(item.id)} />) : <Text style={{ paddingBottom: 20 }}>No Employees have been added yet</Text>}
								<AppButton label="Add New" onPress={addEmployee} />
								<Spacers />
								<Spacers height={50} />

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

export default UpdateDepartment;
