import { useLocalSearchParams, useRouter } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown';
import { SafeAreaView, Text, View, TextInput, ScrollView } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../../../../../../components';
import styles from '../../../../../../../../styles';
import React, { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateEmployee = () => {
	const params = useLocalSearchParams();
	const [employeeType, setEmployeeType] = useState('');
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

	const router = useRouter();
	const schema = yup.object().shape({
		type: yup.string().required('This field is required').oneOf(['educated', 'illiterate'], `type should be a value between 'educated', 'illiterate'`),
		employmentType: yup.string().required('This field is required').oneOf(['working', 'former'], `employmentType should be a value between 'working', 'former'`),
		employmentPosition: yup.string().required('This field is required').oneOf(['fullTime', 'partTime', 'intern'], `employmentPosition should be a value between 'fullTime', 'partTime', 'intern'`),
		userId: yup.string().when('type', {
			is: 'educated',
			then: () => yup.string().required('This field is required'),
			otherwise: () => yup.string(),
		}),
		illiterateEmployeeId: yup.string().when('type', {
			is: 'illiterate',
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
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						<View>
							<Controller
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<SelectDropdown
										defaultValue={value}
										defaultButtonText={'Employee Type'}
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
										defaultButtonText={'Employment Type'}
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
										defaultButtonText={'Employment Position'}
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
											defaultButtonText={'Select User'}
											data={employeeTypeOptions}
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
									name="userId"
								/>
							)}
							{employeeType == 'educated' && errors.userId && errors.userId.message && (
								<>
									<Text style={styles.validationError}>{errors.userId.message}</Text>
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
									<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="Start Date" onBlur={onBlur} onChangeText={onChange} value={value} />} name="startDate" />
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
									<Controller control={control} render={({ field: { onChange, onBlur, value } }) => <TextInput style={styles.textInputField} placeholder="End Date" onBlur={onBlur} onChangeText={onChange} value={value} />} name="endDate" />
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
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateEmployee;
