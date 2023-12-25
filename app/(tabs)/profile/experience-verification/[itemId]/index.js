import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../../../components';
import styles from '../../../../../styles';
import React, { useEffect, useState } from 'react';
import { getValue } from '../../../../../utils/secureStorage';
import { getResumeFullName, dateFormat } from '../../../../../utils';
import authService from '../../../../../services/auth';
import axios from '../../../../../services/axios';
import { COLORS } from '../../../../../constants';

const VerifyWorkExperience = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const [experience, setExperience] = useState({});
	const [experienceLoaded, setExperienceLoaded] = useState(false);

	const [fullName, setFullName] = useState('N/A');
	const [designation, setDesignation] = useState('N/A');
	const [department, setDepartment] = useState('N/A');
	const [stillEmployed, setStillEmployed] = useState('N/A');
	const [startDate, setStartDate] = useState('N/A');
	const [endDate, setEndDate] = useState('N/A');

	async function getExperience() {
		const experienceId = params.itemId;
		const companyId = JSON.parse(await getValue('companyId'));
		if (!companyId || !experienceId) {
			setExperienceLoaded(true);
			return;
		}
		try {
			const token = await authService.getBearerToken();
			const response = await axios.get(`/company/${companyId}/experience-verification/${experienceId}`, {
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
		getExperience();
	}, []);

	useEffect(() => {
		setFullName(getResumeFullName(experience?.resume));
		setDesignation(experience?.designation);
		setDepartment(experience?.resume?.employee?.department?.title);
		setStillEmployed(experience?.stillEmployed ? 'Yes' : 'No');
		setStartDate(experience?.startDate);
		setEndDate(experience?.endDate);
	}, [experience]);

	const onSubmit = async () => {
		try {
			const experienceId = params.itemId;
			const companyId = JSON.parse(await getValue('companyId'));
			if (!companyId || !experienceId) {
				alert('Something went wrong');
				return;
			}
			const token = await authService.getBearerToken();
			const response = await axios.post(
				`/company/${companyId}/experience-verification/${experienceId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.experience) {
				alert('Experience Verified!');
				router.push(`/profile`);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				{experienceLoaded ? (
					<Container>
						<Column>
							<View>
								<Text style={styles.cardSubTitle}>Name</Text>
								<Spacers height={5} />
								<View style={styles.textInputField}>
									<Text>{fullName}</Text>
								</View>
								<Spacers />
							</View>

							<View>
								<Text style={styles.cardSubTitle}>Designation</Text>
								<Spacers height={5} />
								<View style={styles.textInputField}>
									<Text>{designation}</Text>
								</View>
								<Spacers />
							</View>

							<View>
								<Text style={styles.cardSubTitle}>Department</Text>
								<Spacers height={5} />
								<View style={styles.textInputField}>
									<Text>{department}</Text>
								</View>
								<Spacers />
							</View>

							<View>
								<Text style={styles.cardSubTitle}>Employment Status</Text>
								<Spacers height={5} />
								<View style={styles.textInputField}>
									<Text>{stillEmployed}</Text>
								</View>
								<Spacers />
							</View>

							<View>
								<Text style={styles.cardSubTitle}>Joining Date</Text>
								<Spacers height={5} />
								<View style={styles.textInputField}>
									<Text>{dateFormat(startDate)}</Text>
								</View>
								<Spacers />
							</View>

							<View>
								<Text style={styles.cardSubTitle}>Leaving Date</Text>
								<Spacers height={5} />
								<View style={styles.textInputField}>
									<Text>{dateFormat(endDate)}</Text>
								</View>
								<Spacers />
							</View>

							<AppButton label="Approve" type="primary" onPress={onSubmit} />
						</Column>
					</Container>
				) : (
					<ActivityIndicator color={COLORS.accent} size={'large'} />
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default VerifyWorkExperience;
