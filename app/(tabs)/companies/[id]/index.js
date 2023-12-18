import styles from '../../../../styles';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import { Container, Column, Spacers, Section, Carousel, ResumeCard } from '../../../../components';
import { useRouter } from 'expo-router';

const SingleCompany = () => {
	const router = useRouter();
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						<Text style={styles.screenHeading}>Company Title</Text>
						<Spacers height={10} />
						<Text style={styles.text}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate alias beatae quam, provident sunt natus, quis dolor ipsum ut doloribus consequatur deleniti impedit tenetur, voluptate error. Possimus alias modi autem maxime laboriosam eius nemo, natus optio dolor praesentium
							voluptas, rerum voluptatum provident quasi quidem ipsa ullam a excepturi unde quisquam.
						</Text>
						<Spacers height={30} />
						<Section
							titleText="Employees"
							viewAllText="View All"
							viewAllCallback={() =>
								router.push({
									pathname: '/companies/[id]/employees',
									params: { id: 12 },
								})
							}
						>
							<Carousel itemArray={['a', 'b', 'c']} CardModule={ResumeCard} />
						</Section>
						<Spacers height={30} />
						<Section
							titleText="Services"
							viewAllText="View All"
							viewAllCallback={() =>
								router.push({
									pathname: '/companies/[id]/services',
									params: { id: 12 },
								})
							}
						>
							<Carousel itemArray={['a', 'b', 'c']} CardModule={ResumeCard} />
						</Section>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default SingleCompany;
