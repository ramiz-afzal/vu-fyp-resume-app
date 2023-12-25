import { Stack } from 'expo-router';
import styles from '../../../../styles';
import { SafeAreaView, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Container, Column, Spacers, ExperienceCardFull, EducationCardFull, CertificateCardFull, ResumePersonalInfo, ResumeAddressInfo } from '../../../../components';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { COLORS } from '../../../../constants';
import authService from '../../../../services/auth';
import axios from '../../../../services/axios';
import { getResumeFullName, getResumeMeta } from '../../../../utils';

const SingleResume = () => {
	const params = useLocalSearchParams();
	const [resume, setResume] = useState({});
	const [resumesLoaded, setResumesLoaded] = useState(false);
	const verifiedExperiences = useMemo(() => resume?.experience?.filter((x) => x.isVerified), [resume]);
	async function loadResume() {
		try {
			const resumeId = params.id;
			const token = await authService.getBearerToken();
			const response = await axios.get(`/resume/${resumeId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response && response.status == 200 && response.data.resume) {
				setResume(response.data.resume);
				setResumesLoaded(true);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
		}
	}

	useEffect(() => {
		loadResume();
		return () => {
			setResume({});
			setResumesLoaded(false);
		};
	}, [params.id]);

	return (
		<SafeAreaView style={styles.screen}>
			<Stack.Screen options={{ title: 'Resume' }} />
			<ScrollView>
				{resumesLoaded ? (
					<Container>
						<Column>
							<Text style={styles.screenHeading}>{getResumeFullName(resume)}</Text>
							<Text style={styles.cardSubTitle}>{getResumeMeta(resume, 'designation')}</Text>
							<Spacers height={10} />
							<Text style={styles.text}>{getResumeMeta(resume, 'biography')}</Text>
							<Spacers height={30} />

							<Text style={styles.heading}>Education</Text>
							<Spacers height={10} />
							{resume.education.length ? resume.education.map((item, index) => <EducationCardFull item={item} key={index} />) : <Text>No educational records have been added yet.</Text>}
							<Spacers height={30} />

							<Text style={styles.heading}>Work Experience</Text>
							<Spacers height={10} />
							{verifiedExperiences.length ? verifiedExperiences.map((item, index) => <ExperienceCardFull item={item} key={index} />) : <Text>No work experiences have been added yet.</Text>}
							<Spacers height={30} />

							<Text style={styles.heading}>Certificates</Text>
							<Spacers height={10} />
							{resume.certification.length ? resume.certification.map((item, index) => <CertificateCardFull item={item} key={index} />) : <Text>No certifications have been added yet.</Text>}
							<Spacers height={30} />

							<Text style={styles.heading}>Personal Information</Text>
							<Spacers height={10} />
							<ResumePersonalInfo resume={resume} />

							<Spacers height={30} />
							<Text style={styles.heading}>Address Information</Text>
							<Spacers height={10} />
							<ResumeAddressInfo resume={resume} />
						</Column>
					</Container>
				) : (
					<ActivityIndicator color={COLORS.accent} size={'large'} />
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default SingleResume;
