import { Text, View } from 'react-native';
import { IconButton, Spacers } from '../../components';
import styles from '../../styles';
import { ICONS } from '../../constants';
import { dateFormat } from '../../utils';

const EducationEditCardFull = ({ item, onButtonPress }) => {
	const inProcess = item.inProcess || false;
	const institute = item.institute || 'N/A';
	const degree = item.degree || 'N/A';
	const description = item.description || 'N/A';
	const startDate = dateFormat(item.startDate) || null;
	const endDate = dateFormat(item.endDate) || null;
	const editItem = () => {
		if (onButtonPress) {
			onButtonPress();
		}
	};
	return (
		<View style={{ ...styles.staticCardWrapper, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
			<View style={{ width: '80%', marginRight: 10 }}>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{degree}
				</Text>
				<Spacers height={5} />
				<Text numberOfLines={1} style={styles.cardSubTitle}>
					{institute}
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

export default EducationEditCardFull;
