import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Container, Column, Spacers, EmployeeCardFull } from '../../../../components';
import styles from '../../../../styles';
import { COLORS, SIZES } from '../../../../constants';
import authService from '../../../../services/auth';
import axios from '../../../../services/axios';

const Employees = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const [employeeSort, setEmployeeSort] = useState('employee');
	const [company, setCompany] = useState({});
	const [companyLoaded, setCompanyLoaded] = useState(false);

	const workingEmployees = useMemo(() => {
		let employees = [];
		if (company?.departments && company?.departments?.length) {
			company.departments.forEach((department) => {
				if (department && department?.employee && department?.employee?.length) {
					department.employee.forEach((element) => {
						if (element.employmentType == 'working') {
							employees.push(element);
						}
					});
				}
			});
		}
		return employees;
	}, [company]);

	const formerEmployees = useMemo(() => {
		let employees = [];
		if (company?.departments && company?.departments?.length) {
			company.departments.forEach((department) => {
				if (department && department?.employee && department?.employee?.length) {
					department.employee.forEach((element) => {
						if (element.employmentType == 'former') {
							employees.push(element);
						}
					});
				}
			});
		}
		return employees;
	}, [company]);

	const fullTimeEmployees = useMemo(() => {
		let employees = [];
		if (company?.departments && company?.departments?.length) {
			company.departments.forEach((department) => {
				if (department && department?.employee && department?.employee?.length) {
					department.employee.forEach((element) => {
						if (element.employmentPosition == 'fullTime') {
							employees.push(element);
						}
					});
				}
			});
		}
		return employees;
	}, [company]);

	const partTimeEmployees = useMemo(() => {
		let employees = [];
		if (company?.departments && company?.departments?.length) {
			company.departments.forEach((department) => {
				if (department && department?.employee && department?.employee?.length) {
					department.employee.forEach((element) => {
						if (element.employmentPosition == 'partTime') {
							employees.push(element);
						}
					});
				}
			});
		}
		return employees;
	}, [company]);

	const internEmployees = useMemo(() => {
		let employees = [];
		if (company?.departments && company?.departments?.length) {
			company.departments.forEach((department) => {
				if (department && department?.employee && department?.employee?.length) {
					department.employee.forEach((element) => {
						if (element.employmentPosition == 'intern') {
							employees.push(element);
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
					<>
						<View style={styles.sortFilterWrapper}>
							<Pressable onPress={() => setEmployeeSort('employee')}>
								<Text style={styles.sortFilterLink(employeeSort == 'employee')}>Employees</Text>
							</Pressable>
							<Pressable onPress={() => setEmployeeSort('position')}>
								<Text style={styles.sortFilterLink(employeeSort == 'position')}>Position</Text>
							</Pressable>
							<Pressable onPress={() => setEmployeeSort('department')}>
								<Text style={styles.sortFilterLink(employeeSort == 'department')}>Departments</Text>
							</Pressable>
						</View>
						<View>
							{employeeSort == 'employee' && (
								<Container>
									<Column>
										<Text style={styles.heading}>Working Employees</Text>
										<Spacers height={10} />
										{workingEmployees.length ? workingEmployees.map((item, index) => <EmployeeCardFull item={item} key={index} />) : <Text>No data available for this section.</Text>}
										<Spacers height={30} />

										<Text style={styles.heading}>Former Employees</Text>
										<Spacers height={10} />
										{formerEmployees.length ? formerEmployees.map((item, index) => <EmployeeCardFull item={item} key={index} />) : <Text>No data available for this section.</Text>}
										<Spacers height={30} />
									</Column>
								</Container>
							)}
							{employeeSort == 'position' && (
								<Container>
									<Column>
										<Text style={styles.heading}>Full Time Employees</Text>
										<Spacers height={10} />
										{fullTimeEmployees.length ? fullTimeEmployees.map((item, index) => <EmployeeCardFull item={item} key={index} />) : <Text>No data available for this section.</Text>}
										<Spacers height={30} />

										<Text style={styles.heading}>Part Time Employees</Text>
										<Spacers height={10} />
										{partTimeEmployees.length ? partTimeEmployees.map((item, index) => <EmployeeCardFull item={item} key={index} />) : <Text>No data available for this section.</Text>}
										<Spacers height={30} />

										<Text style={styles.heading}>Intern Employees</Text>
										<Spacers height={10} />
										{internEmployees.length ? internEmployees.map((item, index) => <EmployeeCardFull item={item} key={index} />) : <Text>No data available for this section.</Text>}
										<Spacers height={30} />
									</Column>
								</Container>
							)}
							{employeeSort == 'department' && (
								<Container>
									<Column>
										{company?.departments?.length ? (
											company.departments.map((department, dIndex) => (
												<View key={dIndex}>
													<Text style={styles.heading}>{department?.title || 'N/A'}</Text>
													<Spacers height={10} />
													{department?.employee?.length ? department.employee.map((item, index) => <EmployeeCardFull item={item} key={index} />) : <Text>No employee data available for this department.</Text>}
													<Spacers height={30} />
												</View>
											))
										) : (
											<Text>No data available for this section.</Text>
										)}
									</Column>
								</Container>
							)}
						</View>
					</>
				) : (
					<ActivityIndicator color={COLORS.accent} size={'large'} />
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Employees;
