import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import { companyImageSource } from '../../utils';
import { Spacers } from '../../components';

const CompanyCard = ({ item, onPress }) => {
	const companyTitle = item?.title || 'N/A';
	const companyImage = item?.image ? item?.image?.path : null;
	const onItemPress = () => {
		if (onPress) {
			onPress();
		}
	};
	return (
		<TouchableOpacity style={styles.companyCardWrapper} onPress={onItemPress}>
			<View>
				<Image source={companyImageSource(companyImage)} resizeMode="contain" style={styles.cardImage} />
			</View>
			<Spacers height={10} />
			<View style={{ width: '100%', maxWidth: '100%' }}>
				<Text numberOfLines={1} style={{ ...styles.cardTitle, ...{ width: '100%', maxWidth: '100%' } }}>
					{companyTitle}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CompanyCard;
