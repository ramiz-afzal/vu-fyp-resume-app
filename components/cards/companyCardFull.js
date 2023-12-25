import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import { companyImageSource } from '../../utils';

const CompanyCardFull = ({ item, onPress }) => {
	const companyTitle = item?.title || 'N/A';
	const description = item?.description || 'N/A';
	const companyImage = item?.image ? item?.image?.path : null;
	const onItemPress = () => {
		if (onPress) {
			onPress();
		}
	};
	return (
		<TouchableOpacity style={styles.companyCardFullWrapper} onPress={onPress}>
			<View style={styles.cardFullImageWrapper}>
				<Image source={companyImageSource(companyImage)} resizeMode="contain" style={styles.cardImage} />
			</View>
			<View style={styles.cardFullDetailsWrapper}>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{companyTitle}
				</Text>
				{description ? (
					<Text numberOfLines={5} style={styles.cardFullDescription}>
						{description}
					</Text>
				) : null}
			</View>
		</TouchableOpacity>
	);
};

export default CompanyCardFull;
