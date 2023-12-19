import { Text, View } from 'react-native';
import { IconButton, Spacers } from '../../components';
import styles from '../../styles';
import { ICONS } from '../../constants';
import { dateFormat } from '../../utils';

const ExperienceEditCardFull = ({ item, onButtonPress }) => {
	const company = item?.company?.title || 'N/A';
	const designation = item.designation || 'N/A';
	const startDate = dateFormat(item.startDate) || null;
	const endDate = dateFormat(item.endDate) || null;
	const description = item.description || null;
	const stillEmployed = item.stillEmployed || false;
	const isVerified = item.isVerified || false;
	const editItem = () => {
		if (onButtonPress) {
			onButtonPress();
		}
	};
	return (
		<View style={{ ...styles.staticCardWrapper, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
			<View style={{ width: '80%', marginRight: 10 }}>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{designation}
				</Text>
				<Spacers height={5} />
				<Text numberOfLines={1} style={styles.cardSubTitle}>
					{company}
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

export default ExperienceEditCardFull;
