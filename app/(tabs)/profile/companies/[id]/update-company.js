import { useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView, Pressable, Image } from 'react-native';
import { Container, Column, AppButton, Spacers, DepartmentEditCardFull, ServiceEditCardFull, EmployeeEditCardFull } from '../../../../../components';
import styles from '../../../../../styles';
import { companyImageSource } from '../../../../../utils';
import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const UpdateCompany = () => {
	const companyImage = null;
	const companyDepartment = [1, 2, 3, 4];
	const companyEmployees = [1, 2, 3, 4];
	const companyServices = [1, 2, 3, 4];
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
	const onSubmit = (data) => {
		console.log(data);
		router.push({
			pathname: '/profile',
			params: {
				id: 123,
			},
		});
	};
	const addNewDepartment = () => {
		router.push({
			pathname: '/profile/companies/[id]/departments/create',
			params: {
				id: 123,
			},
		});
	};
	const addNewEmployee = () => {
		router.push({
			pathname: '/profile/companies/[id]/employees/create',
			params: {
				id: 123,
			},
		});
	};
	const addNewService = () => {
		router.push({
			pathname: '/profile/companies/[id]/services/create',
			params: {
				id: 123,
			},
		});
	};
	const updateCompanyImage = () => {
		router.push({
			pathname: '/profile/companies/[id]/company-image',
			params: {
				id: 123,
			},
		});
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						<View>
							<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
								<View style={{ marginRight: 10 }}>
									<Image source={companyImageSource(companyImage)} resizeMode="contain" style={styles.cardImage} />
								</View>
								<Pressable onPress={updateCompanyImage}>
									<Text style={styles.linkText('left')}>Update Profile Image</Text>
								</Pressable>
							</View>
							<Spacers />
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

							<Spacers height={30} />
							<Text style={styles.heading}>Departments</Text>
							<Spacers />
							{companyDepartment && companyDepartment.map((item, index) => <DepartmentEditCardFull key={index} />)}
							<AppButton label="Add New" onPress={addNewDepartment} />
							<Spacers />

							<Spacers height={30} />
							<Text style={styles.heading}>Services</Text>
							<Spacers />
							{companyServices && companyServices.map((item, index) => <ServiceEditCardFull key={index} />)}
							<AppButton label="Add New" onPress={addNewService} />
							<Spacers />

							<Spacers height={30} />
							<Text style={styles.heading}>Employees</Text>
							<Spacers />
							{companyEmployees && companyEmployees.map((item, index) => <EmployeeEditCardFull key={index} />)}
							<AppButton label="Add New" onPress={addNewEmployee} />
							<Spacers height={50} />

							<AppButton label="Save Changes" type="primary" onPress={handleSubmit(onSubmit)} />
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default UpdateCompany;
