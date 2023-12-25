import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../../../components';
import styles from '../../../../../styles';
import React, { useEffect, useState } from 'react';
import authService from '../../../../../services/auth';
import axios from '../../../../../services/axios';
import { COLORS } from '../../../../../constants';

const VerifyCompany = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const [company, setCompany] = useState({});
	const [companyLoaded, setCompanyLoaded] = useState(false);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	async function getCompany() {
		const companyId = params.itemId;
		if (!companyId) {
			setCompanyLoaded(true);
			return;
		}
		try {
			const token = await authService.getBearerToken();
			const response = await axios.get(`/company/${companyId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.company) {
				setCompany(response.data.company);
				setCompanyLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
	}

	useEffect(() => {
		getCompany();
	}, []);

	useEffect(() => {
		setTitle(company?.title);
		setDescription(company?.description);
	}, [company]);

	const onSubmit = async () => {
		try {
			const companyId = params.itemId;
			if (!companyId) {
				alert('Something went wrong');
				return;
			}
			const token = await authService.getBearerToken();
			const response = await axios.patch(
				`/company/${companyId}`,
				{ body: { isVerified: 'true' } },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response && response.status == 200 && response.data.company) {
				alert('Company Verified!');
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
				{companyLoaded ? (
					<Container>
						<Column>
							<View>
								<Text style={styles.cardSubTitle}>Company Name</Text>
								<Spacers height={5} />
								<View style={styles.textInputField}>
									<Text>{title}</Text>
								</View>
								<Spacers />
							</View>

							<View>
								<Text style={styles.cardSubTitle}>Company Details</Text>
								<Spacers height={5} />
								<View style={styles.textInputField}>
									<Text>{description}</Text>
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

export default VerifyCompany;
