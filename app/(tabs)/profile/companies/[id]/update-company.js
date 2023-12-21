import { useGlobalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { Container, Column, AppButton, Spacers, DepartmentEditCardFull, ServiceEditCardFull } from '../../../../../components';
import styles from '../../../../../styles';
import { COLORS } from '../../../../../constants';
import { companyImageSource } from '../../../../../utils';
import React, { useEffect, useState } from 'react';
import authService from '../../../../../services/auth';
import axios from '../../../../../services/axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const UpdateCompany = () => {
	const params = useGlobalSearchParams();
	const [company, setCompany] = useState({});
	const [companyLoaded, setCompanyLoaded] = useState(false);
	const companyImage = companyLoaded && company.image ? company.image.path : null;
	const router = useRouter();

	async function getCompany(companyId) {
		companyId = parseInt(companyId);
		try {
			const response = await axios.get(`/company/${companyId}`);
			if (response && response.status == 200 && response.data.company) {
				setCompany(response.data.company);
				setCompanyLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.message);
			alert('Something went wrong.');
		}
	}

	// get company data
	useEffect(() => {
		const companyId = params.id;
		if (companyId) {
			getCompany(companyId);
		}
	}, []);

	const schema = yup.object().shape({
		title: yup.string().required('Company Title is required'),
		description: yup.string().required('Company Description is required'),
	});
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	// set form values
	useEffect(() => {
		setValue('title', company.title || '');
		setValue('description', company.description || '');
	}, [company]);

	const onSubmit = async (data) => {
		let requestParams = {};
		requestParams.title = data?.title || null;
		requestParams.description = data?.description || null;
		try {
			const token = await authService.getBearerToken();
			const response = await axios.patch(
				`/company/${company.id}`,
				{ body: requestParams },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.company) {
				alert('Company Updated');
				getCompany(company.id);
			}
		} catch (error) {
			console.log(error);
			console.log(error.message);
			alert('Something went wrong.');
		}
	};
	const addNewDepartment = () => {
		router.push({
			pathname: '/profile/companies/[id]/departments/create',
			params: {
				id: company.id,
			},
		});
	};
	const addNewService = () => {
		router.push({
			pathname: '/profile/companies/[id]/services/create',
			params: {
				id: company.id,
			},
		});
	};
	const editDepartment = (itemId) => {
		router.push({
			pathname: '/profile/companies/[id]/departments/[itemId]/update',
			params: {
				id: company.id,
				itemId: itemId,
			},
		});
	};
	const editService = (itemId) => {
		router.push({
			pathname: '/profile/companies/[id]/services/[itemId]/update',
			params: {
				id: company.id,
				itemId: itemId,
			},
		});
	};
	const updateCompanyImage = () => {
		router.push({
			pathname: '/profile/companies/[id]/company-image',
			params: {
				id: company.id,
				oldImageId: company?.image?.id || null,
			},
		});
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				{!companyLoaded ? (
					<ActivityIndicator size={'large'} color={COLORS.accent} />
				) : (
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
								{company.departments && company.departments.length ? company.departments.map((item, index) => <DepartmentEditCardFull item={item} key={index} onButtonPress={() => editDepartment(item.id)} />) : <Text style={{ paddingBottom: 20 }}>No Departments have been added yet</Text>}
								<AppButton label="Add New" onPress={addNewDepartment} />
								<Spacers />

								<Spacers height={30} />
								<Text style={styles.heading}>Services</Text>
								<Spacers />
								{company.services && company.services.length ? company.services.map((item, index) => <ServiceEditCardFull item={item} key={index} onButtonPress={() => editService(item.id)} />) : <Text style={{ paddingBottom: 20 }}>No Services have been added yet</Text>}
								<AppButton label="Add New" onPress={addNewService} />
								<Spacers />
								<Spacers height={50} />

								<AppButton label="Save Changes" type="primary" onPress={handleSubmit(onSubmit)} />
							</View>
						</Column>
					</Container>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default UpdateCompany;
