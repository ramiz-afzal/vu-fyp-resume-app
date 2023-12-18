import { useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../../../../components';
import styles from '../../../../../../styles';
import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateDepartment = () => {
	const router = useRouter();
	const schema = yup.object().shape({
		title: yup.boolean().required('This field is required'),
		institute: yup.string().required('This field is required'),
		description: yup.string().required('This field is required'),
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
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default CreateDepartment;
