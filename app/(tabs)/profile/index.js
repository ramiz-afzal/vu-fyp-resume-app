import { SafeAreaView, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../components';
import styles from '../../../styles';
import { ICONS, COLORS } from '../../../constants';
import { useRouter } from 'expo-router';
import { getValue } from '../../../utils/secureStorage';
import authService from '../../../services/auth';
import axios from '../../../services/axios';
import { useState, useEffect } from 'react';
export default () => {
	const router = useRouter();
	const [user, setUser] = useState({});
	const [loginCheck, setLoginCheck] = useState(false);
	const [resumeCheck, setResumeCheck] = useState(false);
	const [companyCheck, setCompanyCheck] = useState(false);
	const [loginStatus, setLoginStatus] = useState(false);
	const [resumeExists, setResumeExists] = useState(false);
	const [companyExists, setCompanyExists] = useState(false);
	const [resumeId, setResumeId] = useState(null);
	const [companyId, setCompanyId] = useState(null);
	const hasRoleId = (user, roleId) => {
		if (!user || !roleId) {
			return false;
		}
		let hasRoleId = false;
		user?.roles?.forEach(async (item) => {
			if (item.role.id == roleId) {
				hasRoleId = true;
			}
		});
		return hasRoleId;
	};

	useEffect(() => {
		async function doLoginCheck() {
			let status = await authService.isLoggedIn();
			setLoginCheck(true);
			setLoginStatus(status);
		}
		if (loginCheck == false) {
			doLoginCheck();
		}
	}, []);

	useEffect(() => {
		(async function () {
			if (loginStatus) {
				const storedUserData = JSON.parse(await getValue('user'));
				if (storedUserData) {
					setUser(storedUserData);
				}
			}
		})();
	}, [loginStatus, loginCheck]);

	useEffect(() => {
		async function doResumeCheck() {
			if (loginStatus) {
				const user = JSON.parse(await getValue('user'));
				if (user && user.roles) {
					let isBasicUser = false;
					user.roles.forEach(async (item) => {
						if (item.role.id == 2) {
							isBasicUser = true;
						}
					});
					if (isBasicUser) {
						try {
							const token = await authService.getBearerToken();
							const response = await axios.get(`/users/${user.id}/resume`, {
								headers: {
									Authorization: `Bearer ${token}`,
								},
							});
							if (response && response.data.resume && response.data.resume.length) {
								const resume = response.data.resume[0];
								setResumeId(resume.id);
								setResumeExists(true);
							}
						} catch (error) {
							console.log(error);
						}
					}
				}
				setResumeCheck(true);
			}
		}
		if (resumeCheck == false) {
			doResumeCheck();
		}
	}, [loginStatus, loginCheck]);

	useEffect(() => {
		async function doCompanyCheck() {
			if (loginStatus) {
				const user = JSON.parse(await getValue('user'));
				if (user && user.roles) {
					let isProfessionalUser = false;
					user.roles.forEach(async (item) => {
						if (item.role.id == 3) {
							isProfessionalUser = true;
						}
					});
					if (isProfessionalUser) {
						try {
							const token = await authService.getBearerToken();
							const response = await axios.get(`/users/${user.id}/company`, {
								headers: {
									Authorization: `Bearer ${token}`,
								},
							});
							if (response && response.data.company && response.data.company.length) {
								const company = response.data.company[0];
								setCompanyId(company.id);
								setCompanyExists(true);
							}
						} catch (error) {
							console.log(error);
						}
					}
				}
				setCompanyCheck(true);
			}
		}
		if (companyCheck == false) {
			doCompanyCheck();
		}
	}, [loginStatus, loginCheck]);

	const doLogout = async () => {
		await authService.setLogout();
		setUser({});
		setLoginStatus(false);
		setLoginCheck(false);
		setResumeExists(false);
		setResumeCheck(false);
		setCompanyExists(false);
		setCompanyCheck(false);
		router.push('/home');
	};
	let myResumeURL = resumeExists ? `/profile/resumes/${resumeId}/update-resume` : '/profile/resumes/create-resume';
	let myCompanyURL = companyExists ? `/profile/companies/${companyId}/update-company` : '/profile/companies/create-company';
	return (
		<SafeAreaView style={styles.screen}>
			<Text>loginCheck: {JSON.stringify(loginCheck)}</Text>
			<Text>resumeCheck: {JSON.stringify(resumeCheck)}</Text>
			<Text>companyCheck: {JSON.stringify(companyCheck)}</Text>
			<Text>loginStatus: {JSON.stringify(loginStatus)}</Text>
			<Text>resumeExists: {JSON.stringify(resumeExists)}</Text>
			<Text>companyExists: {JSON.stringify(companyExists)}</Text>
			{loginCheck == false ? (
				<ActivityIndicator size="large" color={COLORS.accent} />
			) : (
				<Container>
					<Column>
						{loginStatus ? (
							<View>
								{hasRoleId(user, 2) && (
									<TouchableOpacity onPress={() => router.push(myResumeURL)} style={styles.fullWidthLink}>
										<View style={styles.fullWidthLinkTextWrapper}>
											<Text style={styles.fullWidthLinkText}>My Resume</Text>
										</View>
										<View style={styles.fullWidthLinkIconWrapper}>
											<Image source={ICONS.right} resizeMode="contain" style={styles.fullWidthLinkIcon} />
										</View>
									</TouchableOpacity>
								)}

								{hasRoleId(user, 3) && (
									<TouchableOpacity onPress={() => router.push(myCompanyURL)} style={styles.fullWidthLink}>
										<View style={styles.fullWidthLinkTextWrapper}>
											<Text style={styles.fullWidthLinkText}>My Company</Text>
										</View>
										<View style={styles.fullWidthLinkIconWrapper}>
											<Image source={ICONS.right} resizeMode="contain" style={styles.fullWidthLinkIcon} />
										</View>
									</TouchableOpacity>
								)}

								{hasRoleId(user, 3) && (
									<TouchableOpacity onPress={() => router.push('/profile/experience-verification')} style={styles.fullWidthLink}>
										<View style={styles.fullWidthLinkTextWrapper}>
											<Text style={styles.fullWidthLinkText}>Experience Verification</Text>
										</View>
										<View style={styles.fullWidthLinkIconWrapper}>
											<Image source={ICONS.right} resizeMode="contain" style={styles.fullWidthLinkIcon} />
										</View>
									</TouchableOpacity>
								)}

								{hasRoleId(user, 1) && (
									<TouchableOpacity onPress={() => router.push('/profile/company-verification')} style={styles.fullWidthLink}>
										<View style={styles.fullWidthLinkTextWrapper}>
											<Text style={styles.fullWidthLinkText}>Company Verification</Text>
										</View>
										<View style={styles.fullWidthLinkIconWrapper}>
											<Image source={ICONS.right} resizeMode="contain" style={styles.fullWidthLinkIcon} />
										</View>
									</TouchableOpacity>
								)}

								<TouchableOpacity onPress={() => router.push('/profile/change-password')} style={styles.fullWidthLink}>
									<View style={styles.fullWidthLinkTextWrapper}>
										<Text style={styles.fullWidthLinkText}>Change Password</Text>
									</View>
									<View style={styles.fullWidthLinkIconWrapper}>
										<Image source={ICONS.right} resizeMode="contain" style={styles.fullWidthLinkIcon} />
									</View>
								</TouchableOpacity>

								<TouchableOpacity onPress={doLogout} style={styles.fullWidthLink}>
									<View style={styles.fullWidthLinkTextWrapper}>
										<Text style={styles.fullWidthLinkText}>Logout</Text>
									</View>
									<View style={styles.fullWidthLinkIconWrapper}>
										<Image source={ICONS.right} resizeMode="contain" style={styles.fullWidthLinkIcon} />
									</View>
								</TouchableOpacity>
							</View>
						) : (
							<View style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
								<AppButton label="Login" type="primary" onPress={() => router.push('/profile/login')} />
								<Spacers />
								<Text style={{ textAlign: 'center', fontSize: 26 }}>OR</Text>
								<Spacers />
								<AppButton label="Register" type="primary" onPress={() => router.push('/profile/register')} />
							</View>
						)}
					</Column>
				</Container>
			)}
		</SafeAreaView>
	);
};
