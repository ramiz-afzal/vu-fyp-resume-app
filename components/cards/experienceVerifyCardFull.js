import { Text, View } from 'react-native';
import { IconButton, Spacers } from '../../components';
import styles from '../../styles';
import { ICONS } from '../../constants';
import { dateFormat, getResumeFullName } from '../../utils';

const ExperienceVerifyCardFull = ({ item, onButtonPress }) => {
	const fullName = getResumeFullName(item.resume) || 'N/A';
	const designation = item.designation || 'N/A';
	const startDate = dateFormat(item.startDate) || null;
	const endDate = dateFormat(item.endDate) || null;
	const description = item.description || null;
	const editItem = () => {
		if (onButtonPress) {
			onButtonPress();
		}
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
						<Text style={styles.cardSubTitle}>
							From: {startDate} To: {endDate}
						</Text>
						<Spacers height={5} />
					</>
				) : startDate ? (
					<>
						<Text style={styles.cardSubTitle}>From: {startDate} Till date</Text>
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

export default ExperienceVerifyCardFull;
