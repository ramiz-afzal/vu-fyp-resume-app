import { Text, View } from 'react-native';
import { IconButton, Spacers } from '../../components';
import styles from '../../styles';
import { ICONS } from '../../constants';

const EmployeeEditCardFull = ({ item, onButtonPress }) => {
	const fullName = item.fullName || 'N/A';
	const designation = item.designation || 'N/A';
	const description = item.description || 'N/A';
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

export default EmployeeEditCardFull;
