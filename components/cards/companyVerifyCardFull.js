import { Text, View } from 'react-native';
import { IconButton, Spacers } from '../../components';
import styles from '../../styles';
import { ICONS } from '../../constants';

const CompanyVerifyCardFull = ({ item, onButtonPress }) => {
	const title = item?.title || 'N/A';
	const description = item?.description || 'N/A';
	const editItem = () => {
		if (onButtonPress) {
			onButtonPress();
		}
	};
	return (
		<View style={{ ...styles.staticCardWrapper, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
			<View style={{ width: '80%', marginRight: 10 }}>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{title}
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

export default CompanyVerifyCardFull;
