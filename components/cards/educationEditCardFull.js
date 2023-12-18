import { Text, View } from 'react-native';
import { IconButton, Spacers } from '../../components';
import styles from '../../styles';
import { ICONS } from '../../constants';
import { useRouter } from 'expo-router';

const EducationEditCardFull = (item) => {
	const router = useRouter();
	const degreeTitle = item.degreeTitle || 'Degree Title';
	const instituteTitle = item.instituteTitle || 'School or Collage';
	const description = item.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, reprehenderit.';
	const startDate = item.startDate || 'Jan, 2023';
	const endDate = item.endDate || 'Jan, 2023';
	const editItem = () => {
		router.push({
			pathname: '/profile/resumes/[id]/education/[itemId]/update',
			params: {
				id: 12,
				itemId: 34,
			},
		});
	};
	return (
		<View style={{ ...styles.staticCardWrapper, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
			<View style={{ width: '80%', marginRight: 10 }}>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{degreeTitle}
				</Text>
				<Spacers height={5} />
				<Text numberOfLines={1} style={styles.cardSubTitle}>
					{instituteTitle}
				</Text>
				<Spacers height={5} />
				{startDate && endDate ? (
					<>
						<Text style={styles.text}>
							From: {startDate} To: {endDate}
						</Text>
						<Spacers height={5} />
					</>
				) : startDate ? (
					<>
						<Text style={styles.text}>From: {startDate} Till date</Text>
						<Spacers height={5} />
					</>
				) : null}
				{description ? (
					<Text numberOfLines={2} style={styles.text}>
						{description}
					</Text>
				) : null}
			</View>
			<View style={{ flexGrow: 1, flexShrink: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<IconButton iconUrl={ICONS.edit} onPress={editItem} />
			</View>
		</View>
	);
};

export default EducationEditCardFull;
