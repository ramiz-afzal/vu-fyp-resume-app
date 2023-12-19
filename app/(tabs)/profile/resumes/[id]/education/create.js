import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { Container, Column, AppButton, Spacers, DateTimePickerField } from '../../../../../../components';
import styles from '../../../../../../styles';
import React, { useState } from 'react';
import authService from '../../../../../../services/auth';
import axios from '../../../../../../services/axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateEducation = () => {
	const params = useLocalSearchParams();
	const [isInProcess, setIsInProcess] = useState(true);
	const router = useRouter();
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
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		let requestParams = {};
		requestParams.inProcess = data.inProcess;
		requestParams.institute = data?.institute || null;
		requestParams.degree = data?.degree || null;
		requestParams.startDate = data?.startDate || null;
		requestParams.endDate = data?.endDate || null;
		requestParams.description = data?.description || null;
		try {
			const token = await authService.getBearerToken();
			const response = await axios.post(
				`/resume/${params.id}/education`,
				{ ...requestParams },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.education) {
				alert('Work Experience Added!');
				router.replace(`/profile/resumes/${params.id}/update-resume`);
			}
		} catch (error) {
			console.log(error.message);
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
							<Text>params.id: {params.id}</Text>
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
										defaultValue={isInProcess}
										defaultButtonText={'Under Process'}
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
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateEducation;
