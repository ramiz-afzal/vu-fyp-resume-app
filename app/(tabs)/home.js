import { SafeAreaView, ScrollView, View } from 'react-native';
import { Container, Column, Spacers, SearchElement, Section, Carousel, ResumeCard, CompanyCard } from '../../components';
import styles from '../../styles';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default () => {
	const [searchQuery, setSearchQuery] = useState('');
	const router = useRouter();
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
							<Section titleText="Resumes" viewAllText="View All" viewAllCallback={() => router.push('/resumes')}>
								<Carousel itemArray={['a', 'b', 'c']} CardModule={ResumeCard} />
							</Section>
							<Spacers height={50} />
							<Section titleText="Companies" viewAllText="View All" viewAllCallback={() => router.push('/companies')}>
								<Carousel itemArray={['a', 'b', 'c']} CardModule={CompanyCard} />
							</Section>
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};
