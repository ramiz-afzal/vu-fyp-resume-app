import { Text, View } from 'react-native';
import { IconButton, Spacers } from '../../components';
import styles from '../../styles';
import { ICONS } from '../../constants';
import { useRouter } from 'expo-router';

const ExperienceVerifyCardFull = (item) => {
	const router = useRouter();
	const fullName = item.fullName || 'John Doe';
	const designation = item.designation || 'Developer';
	const startDate = item.startDate || 'Jan, 2023';
	const endDate = item.endDate || 'Jan, 2023';
	const editItem = () => {
		router.push({
			pathname: '/profile/experience-verification/[itemId]',
			params: {
				itemId: 34,
			},
		});
	};
	return (
		<View style={{ ...styles.staticCardWrapper, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
			<View style={{ width: '80%', marginRight: 10 }}>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{fullName}
				</Text>
				<Spacers height={5} />
				<Text numberOfLines={1} style={styles.cardSubTitle}>
					{designation}
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
			</View>
			<View style={{ flexGrow: 1, flexShrink: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<IconButton iconUrl={ICONS.edit} onPress={editItem} />
			</View>
		</View>
	);
};

export default ExperienceVerifyCardFull;
