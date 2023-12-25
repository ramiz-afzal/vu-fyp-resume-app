import { Text, View } from 'react-native';
import { Spacers } from '../../components';
import styles from '../../styles';
import { dateFormat } from '../../utils';

const ExperienceCardFull = ({ item }) => {
	const designation = item.designation || 'N/A';
	const companyTitle = item?.company?.title || 'N/A';
	const description = item.description || 'N/A';
	const startDate = dateFormat(item.startDate) || null;
	const endDate = dateFormat(item.endDate) || null;

	return (
		<View style={styles.staticCardWrapper}>
			<Text numberOfLines={1} style={styles.cardTitle}>
				{designation}
			</Text>
			<Spacers height={5} />
			<Text numberOfLines={1} style={styles.cardSubTitle}>
				{companyTitle}
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
			{description ? <Text style={styles.text}>{description}</Text> : null}
		</View>
	);
};

export default ExperienceCardFull;
