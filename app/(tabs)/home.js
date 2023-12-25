import { SafeAreaView, ScrollView, View, ActivityIndicator, FlatList } from 'react-native';
import { Container, Column, Spacers, SearchElement, Section, ResumeCard, CompanyCard } from '../../components';
import styles from '../../styles';
import { COLORS, SIZES } from '../../constants';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import authService from '../../services/auth';
import axios from '../../services/axios';

export default () => {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [companies, setCompanies] = useState([]);
	const [resumes, setResumes] = useState([]);
	const [companiesLoaded, setCompaniesLoaded] = useState(false);
	const [resumesLoaded, setResumesLoaded] = useState(false);

	async function loadResumes() {
		try {
			const token = await authService.getBearerToken();
			const response = await axios.get(`/resume`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.resumes) {
				setResumes(response.data.resumes);
				setResumesLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
		}
	}
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
		loadResumes();
		loadCompanies();
		return () => {
			setResumes([]);
			setResumesLoaded(false);
			setCompanies([]);
			setCompaniesLoaded(false);
		};
	}, []);

	const onInput = (text) => {
		setSearchQuery(text);
	};

	const onSubmit = () => {
		router.push({
			pathname: '/search/[query]',
			params: {
				query: searchQuery,
			},
		});
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Container>
					<Column>
						<View>
							<Spacers />
							<SearchElement onSubmit={onSubmit} onInput={onInput} />
							<Spacers height={50} />
							{resumesLoaded ? (
								<Section titleText="Resumes" viewAllText="View All" viewAllCallback={() => router.push('/resumes')}>
									<View style={{ padding: 0 }}>
										<FlatList
											data={resumes}
											renderItem={function ({ item, index }) {
												return <ResumeCard item={item} index={index} onPress={() => router.replace(`/resumes/${item?.id}`)} />;
											}}
											keyExtractor={(item) => item?.id}
											contentContainerStyle={{ columnGap: SIZES.medium }}
											horizontal
											showsHorizontalScrollIndicator={false}
										/>
									</View>
								</Section>
							) : (
								<ActivityIndicator color={COLORS.accent} size={'large'} />
							)}

							<Spacers height={50} />
							{companiesLoaded ? (
								<Section titleText="Companies" viewAllText="View All" viewAllCallback={() => router.push('/companies')}>
									<View style={{ padding: 0 }}>
										<FlatList
											data={companies}
											renderItem={function ({ item, index }) {
												return <CompanyCard item={item} index={index} onPress={() => router.push(`/companies/${item?.id}`)} />;
											}}
											keyExtractor={(item) => item?.id}
											contentContainerStyle={{ columnGap: SIZES.medium }}
											horizontal
											showsHorizontalScrollIndicator={false}
										/>
									</View>
								</Section>
							) : (
								<ActivityIndicator color={COLORS.accent} size={'large'} />
							)}
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};
