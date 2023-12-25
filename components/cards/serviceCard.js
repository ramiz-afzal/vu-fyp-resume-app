import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../../styles';

const ServiceCard = ({ item, onPress }) => {
	const title = item?.title || 'N/A';
	const description = item?.description || 'N/A';
	const onItemPress = () => {
		if (onPress) {
			onPress();
		}
	};
	return (
		<TouchableOpacity style={styles.serviceCardWrapper} onPress={onItemPress}>
			<View>
				<Text numberOfLines={2} style={styles.cardTitle}>
					{title}
				</Text>
				<Text numberOfLines={2} style={styles.cardSubTitle}>
					{description}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ServiceCard;
