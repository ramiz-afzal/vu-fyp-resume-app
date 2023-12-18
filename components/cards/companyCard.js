import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import { companyImageSource } from '../../utils';
import { Spacers } from '../../components';
import { useRouter } from 'expo-router';

const CompanyCard = ({ fullName = 'N/A', companyImage = null }) => {
	const router = useRouter();
	const onPress = () => {
		router.push('/companies/1');
	};
	return (
		<TouchableOpacity style={styles.companyCardWrapper} onPress={onPress}>
			<View>
				<Image source={companyImageSource(companyImage)} resizeMode="contain" style={styles.cardImage} />
			</View>
			<Spacers height={10} />
			<View>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{fullName}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CompanyCard;
