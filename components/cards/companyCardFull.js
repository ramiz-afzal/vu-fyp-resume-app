import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import { companyImageSource } from '../../utils';
import { useRouter } from 'expo-router';

const CompanyCardFull = (item) => {
	const companyTitle = item.companyTitle || 'N/A';
	const companyImage = item.companyImage || null;
	const description = item.description || 'No description provided';

	const router = useRouter();
	const onPress = () => {
		router.push('/companies/1');
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
