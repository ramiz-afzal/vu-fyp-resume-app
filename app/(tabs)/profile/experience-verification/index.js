import { Stack, useRouter } from 'expo-router';
import { SafeAreaView, FlatList, ActivityIndicator, Text } from 'react-native';
import { Container, Column, ExperienceVerifyCardFull } from '../../../../components';
import { getValue } from '../../../../utils/secureStorage';
import authService from '../../../../services/auth';
import axios from '../../../../services/axios';
import styles from '../../../../styles';
import { SIZES, COLORS } from '../../../../constants';
import React, { useEffect, useState } from 'react';

const ExperienceVerification = () => {
	const router = useRouter();
	const [pendingVerifications, setPendingVerifications] = useState([]);
	const [pendingVerificationsLoaded, setPendingVerificationsLoaded] = useState(false);
	async function getPendingVerifications() {
		const companyId = JSON.parse(await getValue('companyId'));
		if (!companyId) {
			setPendingVerificationsLoaded(true);
			return;
		}

		try {
			const token = await authService.getBearerToken();
			const response = await axios.get(`company/${companyId}/experience-verification?isVerified=false`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.experience) {
				setPendingVerifications(response.data.experience);
				setPendingVerificationsLoaded(true);
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getPendingVerifications();
	}, []);

	const viewPendingVerification = async (itemId) => {
		router.push({
			pathname: '/profile/experience-verification/[itemId]',
			params: {
				itemId: itemId,
			},
		});
	};
	return (
		<>
			<Stack.Screen options={{ title: 'Verify User Work Experience' }} />
			<SafeAreaView style={styles.screen}>
				{pendingVerificationsLoaded ? (
					<Container>
						<Column>
							{pendingVerifications.length ? (
								<FlatList
									data={pendingVerifications}
									renderItem={function ({ item, index }) {
										return <ExperienceVerifyCardFull key={index} item={item} onButtonPress={() => viewPendingVerification(item.id)} />;
									}}
									keyExtractor={(item) => item?.id}
									contentContainerStyle={{ columnGap: SIZES.medium }}
								/>
							) : (
								<Text>No pending verifications</Text>
							)}
						</Column>
					</Container>
				) : (
					<ActivityIndicator color={COLORS.accent} size={'large'} />
				)}
			</SafeAreaView>
		</>
	);
};

export default ExperienceVerification;
