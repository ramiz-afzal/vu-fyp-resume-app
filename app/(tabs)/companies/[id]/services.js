import { SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Container, Column, ServiceCardFull, Spacers } from '../../../../components';
import styles from '../../../../styles';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../../../constants';
import authService from '../../../../services/auth';
import axios from '../../../../services/axios';

export default () => {
	const params = useLocalSearchParams();
	const [services, setServices] = useState([]);
	const [servicesLoaded, setServicesLoaded] = useState(false);

	async function loadServices() {
		try {
			const companyId = params.id;
			const token = await authService.getBearerToken();
			const response = await axios.get(`/company/${companyId}/service`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.services) {
				setServices(response.data.services);
				setServicesLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
		}
	}

	// load data
	useEffect(() => {
		loadServices();
		return () => {
			setServices([]);
			setServicesLoaded(false);
		};
	}, []);

	return (
		<SafeAreaView style={styles.screen}>
			{servicesLoaded ? (
				<Container>
					<Column>
						<FlatList
							data={services}
							renderItem={function ({ item, index }) {
								return (
									<>
										<ServiceCardFull item={item} index={index} />
										<Spacers height={10} />
									</>
								);
							}}
							keyExtractor={(item) => item?.id}
							contentContainerStyle={{ columnGap: SIZES.medium }}
						/>
					</Column>
				</Container>
			) : (
				<ActivityIndicator color={COLORS.accent} size={'large'} />
			)}
		</SafeAreaView>
	);
};
