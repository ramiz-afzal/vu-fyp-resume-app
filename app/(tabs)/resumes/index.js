import { SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { Container, Column, ResumeCardFull } from '../../../components';
import styles from '../../../styles';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { COLORS, SIZES } from '../../../constants';
import authService from '../../../services/auth';
import axios from '../../../services/axios';

export default () => {
	const router = useRouter();
	const [resumes, setResumes] = useState([]);
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

	// load data
	useEffect(() => {
		loadResumes();
		return () => {
			setResumes([]);
			setResumesLoaded(false);
		};
	}, []);

	return (
		<SafeAreaView style={styles.screen}>
			{resumesLoaded ? (
				<Container>
					<Column>
						<FlatList
							data={resumes}
							renderItem={function ({ item, index }) {
								return <ResumeCardFull item={item} index={index} onPress={() => router.replace(`/resumes/${item?.id}`)} />;
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
