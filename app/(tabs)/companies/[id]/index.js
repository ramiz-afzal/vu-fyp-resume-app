import styles from '../../../../styles';
import { SafeAreaView, ScrollView, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Container, Column, Spacers, Section, ServiceCard, ResumeCard } from '../../../../components';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { COLORS, SIZES } from '../../../../constants';
import authService from '../../../../services/auth';
import axios from '../../../../services/axios';

const SingleCompany = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const [company, setCompany] = useState({});
	const [companyLoaded, setCompanyLoaded] = useState(false);
	const companyEmployees = useMemo(() => {
		let employees = [];
		if (company?.departments && company?.departments?.length) {
			company.departments.forEach((department) => {
				if (department && department?.employee && department?.employee?.length) {
					department.employee.forEach((element) => {
						if (element?.resume) {
							employees.push(element.resume);
						}
					});
				}
			});
		}
		return employees;
	}, [company]);

	async function loadCompany() {
		try {
			const companyId = params.id;
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
		}
	}

	useEffect(() => {
		loadCompany();
		return () => {
			setCompany({});
			setCompanyLoaded(false);
		};
	}, [params.id]);

	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				{companyLoaded ? (
					<Container>
						<Column>
							<Text style={styles.screenHeading}>{company?.title}</Text>
							<Spacers height={10} />
							<Text style={styles.text}>{company?.description}</Text>
							<Spacers height={30} />
							{companyEmployees.length ? (
								<Section
									titleText="Employees"
									viewAllText="View All"
									viewAllCallback={() =>
										router.push({
											pathname: '/companies/[id]/employees',
											params: { id: params.id },
										})
									}
								>
									<View style={{ padding: 0 }}>
										<FlatList
											data={companyEmployees}
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
								<>
									<Text style={styles.sectionTitle}>Employees</Text>
									<Spacers height={10} />
									<Text>No Employee data available</Text>
								</>
							)}

							<Spacers height={30} />
							{company.services && company.services.length ? (
								<Section
									titleText="Services"
									viewAllText="View All"
									viewAllCallback={() =>
										router.push({
											pathname: '/companies/[id]/services',
											params: { id: params.id },
										})
									}
								>
									<View style={{ padding: 0 }}>
										<FlatList
											data={company.services}
											renderItem={function ({ item, index }) {
												return <ServiceCard item={item} index={index} />;
											}}
											keyExtractor={(item) => item?.id}
											contentContainerStyle={{ columnGap: SIZES.medium }}
											horizontal
											showsHorizontalScrollIndicator={false}
										/>
									</View>
								</Section>
							) : (
								<>
									<Text style={styles.sectionTitle}>Services</Text>
									<Spacers height={10} />
									<Text>This company hasn't listed any services yet.</Text>
								</>
							)}
						</Column>
					</Container>
				) : (
					<ActivityIndicator color={COLORS.accent} size={'large'} />
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default SingleCompany;
