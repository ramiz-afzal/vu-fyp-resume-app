import { SafeAreaView, Text, View, TextInput, ScrollView, Image, Pressable, ActivityIndicator } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Container, Column, AppButton, Spacers, DateTimePickerField, ExperienceEditCardFull, EducationEditCardFull, CertificateEditCardFull } from '../../../../../components';
import styles from '../../../../../styles';
import { COLORS } from '../../../../../constants';
import { profileImageSource } from '../../../../../utils';
import React, { useEffect, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams, useRouter } from 'expo-router';
import authService from '../../../../../services/auth';
import axios from '../../../../../services/axios';

const UpdateResume = () => {
	const [resume, setResume] = useState({});
	const [resumeLoaded, setResumeLoaded] = useState(false);
	const profileImage = resumeLoaded && resume.image ? resume.image.path : null;
	const router = useRouter();
	const params = useLocalSearchParams();

	const getMeta = (key) => {
		let value = '';
		if (key) {
			if (resume && resume.meta) {
				resume.meta.forEach((item) => {
					if (item.key == key) {
						value = item.value;
					}
				});
			}
		}
		return value;
	};

	async function getResume(resumeId) {
		resumeId = parseInt(resumeId);
		try {
			const response = await axios.get(`/resume/${resumeId}`);
			if (response && response.status == 200 && response.data.resume) {
				setResume(response.data.resume);
				setResumeLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.message);
			alert('Something went wrong.');
		}
	}

	// get resume data
	useEffect(() => {
		const resumeId = params.id;
		if (resumeId) {
			getResume(resumeId);
		}
	}, []);

	const genderSelectOptions = [
		{
			label: 'Male',
			value: 'male',
		},
		{
			label: 'Female',
			value: 'female',
		},
	];
	const martialStatusSelectOptions = [
		{
			label: 'Single',
			value: 'single',
		},
		{
			label: 'Married',
			value: 'married',
		},
	];
	const addNewWorkExperience = () => {
		router.push({
			pathname: '/profile/resumes/[id]/work-experience/create',
			params: {
				id: resume.id,
			},
		});
	};
	const editWorkExperience = (itemId) => {
		router.push({
			pathname: '/profile/resumes/[id]/work-experience/[itemId]/update',
			params: {
				id: resume.id,
				itemId: itemId,
			},
		});
	};
	const addNewEducation = () => {
		router.push({
			pathname: '/profile/resumes/[id]/education/create',
			params: {
				id: resume.id,
			},
		});
	};
	const editEducation = (itemId) => {
		router.push({
			pathname: '/profile/resumes/[id]/education/[itemId]/update',
			params: {
				id: resume.id,
				itemId: itemId,
			},
		});
	};
	const addNewCertificate = () => {
		router.push({
			pathname: '/profile/resumes/[id]/certificates/create',
			params: {
				id: resume.id,
			},
		});
	};
	const editCertificate = (itemId) => {
		router.push({
			pathname: '/profile/resumes/[id]/certificates/[itemId]/update',
			params: {
				id: resume.id,
				itemId: itemId,
			},
		});
	};
	const schema = yup.object().shape({
		firstName: yup.string().required('First Name is required'),
		lastName: yup.string().required('Last Name is required'),
		biography: yup.string().required('Biography is required'),
		designation: yup.string().required('Designation is required'),
		phone: yup.string().required('Phone is required'),
		gender: yup.string().required('Gender is required'),
		dob: yup.string().required('Date of Birth is required'),
		religion: yup.string().required('Religion is required'),
		martialStatus: yup.string().required('Martial Status is required'),
		address_1: yup.string().required('Address Line 1 is required'),
		address_2: yup.string(),
		city: yup.string().required('City is required'),
		state: yup.string().required('State is required'),
		country: yup.string().required('Country is required'),
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
		setValue('firstName', getMeta('first_name') || '');
		setValue('lastName', getMeta('last_name') || '');
		setValue('biography', getMeta('biography') || '');
		setValue('designation', getMeta('designation') || '');
		setValue('phone', getMeta('phone') || '');
		setValue('gender', getMeta('gender') || '');
		setValue('dob', getMeta('dob') || '');
		setValue('religion', getMeta('religion') || '');
		setValue('martialStatus', getMeta('martial_status') || '');
		setValue('address_1', getMeta('address_1') || '');
		setValue('address_2', getMeta('address_2') || '');
		setValue('city', getMeta('city') || '');
		setValue('state', getMeta('state') || '');
		setValue('country', getMeta('country') || '');
	}, [resume]);

	const onSubmit = async (data) => {
		let requestParams = {};
		requestParams.firstName = data?.firstName || null;
		requestParams.lastName = data?.lastName || null;
		requestParams.biography = data?.biography || null;
		requestParams.designation = data?.designation || null;
		requestParams.phone = data?.phone || null;
		requestParams.gender = data?.gender || null;
		requestParams.dob = data?.dob || null;
		requestParams.religion = data?.religion || null;
		requestParams.martialStatus = data?.martialStatus || null;
		requestParams.address_1 = data?.address_1 || null;
		requestParams.address_2 = data?.address_2 || null;
		requestParams.city = data?.city || null;
		requestParams.state = data?.state || null;
		requestParams.country = data?.country || null;
		try {
			const token = await authService.getBearerToken();
			const response = await axios.patch(
				`/resume/${resume.id}`,
				{ body: requestParams },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.resume) {
				alert('Resume Updated');
				getResume(resume.id);
			}
		} catch (error) {
			console.log(error);
			console.log(error.message);
			alert('Something went wrong.');
		}
	};
	const updateProfileImage = (data) => {
		router.push({
			pathname: '/profile/resumes/[id]/profile-image',
			params: {
				id: resume.id,
				oldImageId: resume?.image?.id || null,
			},
		});
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				{!resumeLoaded ? (
					<ActivityIndicator size={'large'} color={COLORS.accent} />
				) : (
					<Container>
						<Column>
							<View>
								<View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
									<View style={{ marginRight: 10 }}>
										<Image source={profileImageSource(profileImage)} resizeMode="contain" style={styles.cardImage} />
									</View>
									<Pressable onPress={updateProfileImage}>
										<Text style={styles.linkText('left')}>Update Profile Image</Text>
									</Pressable>
								</View>
								<Spacers />
								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="First Name" onBlur={onBlur} onChangeText={onChange} value={value} />} name="firstName" />
								{errors.firstName && errors.firstName.message && <Text style={styles.validationError}>{errors.firstName.message}</Text>}
								<Spacers />
								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Last Name" onBlur={onBlur} onChangeText={onChange} value={value} />} name="lastName" />
								{errors.lastName && errors.lastName.message && <Text style={styles.validationError}>{errors.lastName.message}</Text>}
								<Spacers />
								<Controller
									control={control}
									render={({ field: { onChange, onBlur, value } }) => <TextInput multiline={true} numberOfLines={10} style={{ ...styles.textInputField, textAlignVertical: 'top' }} placeholder="Biography" onBlur={onBlur} onChangeText={onChange} value={value} />}
									name="biography"
								/>
								{errors.biography && errors.biography.message && <Text style={styles.validationError}>{errors.biography.message}</Text>}

								<Spacers height={30} />
								<Text style={styles.heading}>Personal Details</Text>
								<Spacers />
								<Controller control={control} render={({ field: { onChange, onBlur, value, ref } }) => <TextInput style={styles.textInputField} placeholder="Designation" onBlur={onBlur} onChangeText={onChange} value={value} />} name="designation" />
								{errors.designation && errors.designation.message && <Text style={styles.validationError}>{errors.designation.message}</Text>}
								<Spacers />
								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Phone" onBlur={onBlur} onChangeText={onChange} value={value} />} name="phone" />
								{errors.phone && errors.phone.message && <Text style={styles.validationError}>{errors.phone.message}</Text>}
								<Spacers />

								<Controller
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<SelectDropdown
											defaultValue={value}
											defaultButtonText={value || 'Select Gender'}
											data={genderSelectOptions}
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
									name="gender"
								/>
								{errors.gender && errors.gender.message && <Text style={styles.validationError}>{errors.gender.message}</Text>}
								<Spacers />

								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <DateTimePickerField placeholder="Date of Birth" onBlur={onBlur} onChange={onChange} value={value} />} name="dob" />
								{errors.dob && errors.dob.message && <Text style={styles.validationError}>{errors.dob.message}</Text>}
								<Spacers />

								<Spacers />
								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Religion" onBlur={onBlur} onChangeText={onChange} value={value} />} name="religion" />
								{errors.religion && errors.religion.message && <Text style={styles.validationError}>{errors.religion.message}</Text>}
								<Spacers />

								<Controller
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<SelectDropdown
											defaultValue={value}
											defaultButtonText={value || 'Select Martial Status'}
											data={martialStatusSelectOptions}
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
									name="martialStatus"
								/>
								{errors.martialStatus && errors.martialStatus.message && <Text style={styles.validationError}>{errors.martialStatus.message}</Text>}

								<Spacers height={30} />
								<Text style={styles.heading}>Address Details</Text>
								<Spacers />
								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Address Line 1" onBlur={onBlur} onChangeText={onChange} value={value} />} name="address_1" />
								{errors.address_1 && errors.address_1.message && <Text style={styles.validationError}>{errors.address_1.message}</Text>}
								<Spacers />
								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Address Line 2" onBlur={onBlur} onChangeText={onChange} value={value} />} name="address_2" />
								{errors.address_2 && errors.address_2.message && <Text style={styles.validationError}>{errors.address_2.message}</Text>}
								<Spacers />
								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="City" onBlur={onBlur} onChangeText={onChange} value={value} />} name="city" />
								{errors.city && errors.city.message && <Text style={styles.validationError}>{errors.city.message}</Text>}
								<Spacers />
								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="State" onBlur={onBlur} onChangeText={onChange} value={value} />} name="state" />
								{errors.state && errors.state.message && <Text style={styles.validationError}>{errors.state.message}</Text>}
								<Spacers />
								<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Country" onBlur={onBlur} onChangeText={onChange} value={value} />} name="country" />
								{errors.country && errors.country.message && <Text style={styles.validationError}>{errors.country.message}</Text>}
								<Spacers />

								<Spacers height={30} />
								<Text style={styles.heading}>Work Experience</Text>
								<Spacers />
								{resume.experience.length ? resume.experience.map((item, index) => <ExperienceEditCardFull item={item} key={index} onButtonPress={() => editWorkExperience(item.id)} />) : <Text>No Work Experiences have been added yet</Text>}
								<AppButton label="Add New" onPress={addNewWorkExperience} />
								<Spacers />

								<Spacers height={30} />
								<Text style={styles.heading}>Education</Text>
								<Spacers />
								{resume.education.length ? resume.education.map((item, index) => <EducationEditCardFull item={item} key={index} onButtonPress={() => editEducation(item.id)} />) : <Text>No Education Items have been added yet</Text>}
								<AppButton label="Add New" onPress={addNewEducation} />
								<Spacers />

								<Spacers height={30} />
								<Text style={styles.heading}>Certificates</Text>
								<Spacers />
								{resume.certification.length ? resume.certification.map((item, index) => <CertificateEditCardFull item={item} key={index} onButtonPress={() => editCertificate(item.id)} />) : <Text>No Certifications have been added yet</Text>}
								<AppButton label="Add New" onPress={addNewCertificate} />
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

export default UpdateResume;
