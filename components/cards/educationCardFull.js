import { Text, View } from 'react-native';
import { Spacers } from '../../components';
import styles from '../../styles';

const EducationCardFull = (item) => {
	const degreeTitle = item.degreeTitle || 'Degree Title';
	const instituteTitle = item.instituteTitle || 'School or Collage';
	const description = item.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, reprehenderit.';
	const startDate = item.startDate || 'Jan, 2023';
	const endDate = item.endDate || 'Jan, 2023';

	return (
		<View style={styles.staticCardWrapper}>
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
			{description ? <Text style={styles.text}>{description}</Text> : null}
		</View>
	);
};

export default EducationCardFull;
