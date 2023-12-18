import { Stack } from 'expo-router';
import styles from '../../../../styles';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { Container, Column, Spacers, ExperienceCardFull, EducationCardFull, CertificateCardFull, ResumePersonalInfo, ResumeAddressInfo } from '../../../../components';

const SingleResume = () => {
	return (
		<SafeAreaView style={styles.screen}>
			<Stack.Screen options={{ title: 'Resume' }} />
			<ScrollView>
				<Container>
					<Column>
						<Text style={styles.screenHeading}>Profile Title</Text>
						<Text style={styles.cardSubTitle}>Designation</Text>
						<Spacers height={10} />
						<Text style={styles.text}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate alias beatae quam, provident sunt natus, quis dolor ipsum ut doloribus consequatur deleniti impedit tenetur, voluptate error. Possimus alias modi autem maxime laboriosam eius nemo, natus optio dolor praesentium
							voluptas, rerum voluptatum provident quasi quidem ipsa ullam a excepturi unde quisquam.
						</Text>
						<Spacers height={30} />
						<Text style={styles.heading}>Education</Text>
						<Spacers height={10} />
						{[1, 2, 3, 4].map((item) => (
							<EducationCardFull key={item} />
						))}
						<Spacers height={30} />
						<Text style={styles.heading}>Work Experience</Text>
						<Spacers height={10} />
						{[1, 2, 3, 4].map((item) => (
							<ExperienceCardFull key={item} />
						))}
						<Spacers height={30} />
						<Text style={styles.heading}>Certificates</Text>
						<Spacers height={10} />
						{[1, 2, 3, 4].map((item) => (
							<CertificateCardFull key={item} />
						))}
						<Spacers height={30} />
						<Text style={styles.heading}>Personal Information</Text>
						<Spacers height={10} />
						<ResumePersonalInfo />

						<Spacers height={30} />
						<Text style={styles.heading}>Address Information</Text>
						<Spacers height={10} />
						<ResumeAddressInfo />
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SingleResume;
