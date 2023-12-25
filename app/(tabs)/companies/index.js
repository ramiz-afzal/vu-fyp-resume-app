import { SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import { Container, Column, CompanyCardFull } from '../../../components';
import styles from '../../../styles';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../../constants';
import authService from '../../../services/auth';
import axios from '../../../services/axios';

export default () => {
	const router = useRouter();
	const [companies, setCompanies] = useState([]);
	const [companiesLoaded, setCompaniesLoaded] = useState(false);

	async function loadCompanies() {
		try {
			const token = await authService.getBearerToken();
			const response = await axios.get(`/company?isVerified=true`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.companies) {
				setCompanies(response.data.companies);
				setCompaniesLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
		}
	}

	// load data
	useEffect(() => {
		loadCompanies();
		return () => {
			setCompanies([]);
			setCompaniesLoaded(false);
		};
	}, []);

	return (
		<SafeAreaView style={styles.screen}>
			{companiesLoaded ? (
				<Container>
					<Column>
						<FlatList
							data={companies}
							renderItem={function ({ item, index }) {
								return <CompanyCardFull item={item} index={index} onPress={() => router.replace(`/companies/${item?.id}`)} />;
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
