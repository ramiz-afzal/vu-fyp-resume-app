import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import { profileImageSource } from '../../utils';
import { Spacers } from '../../components';
import { useRouter } from 'expo-router';

const CompanyCardFull = (item) => {
	const fullName = item.fullName || 'N/A';
	const profileImage = item.profileImage || null;
	const designation = item.designation || 'No designation provided';
	const description = item.description || 'No description provided';
	const router = useRouter();
	const onPress = () => {
		router.push('/resumes/1');
	};
	return (
		<TouchableOpacity style={styles.companyCardFullWrapper} onPress={onPress}>
			<View style={styles.cardFullImageWrapper}>
				<Image source={profileImageSource(profileImage)} resizeMode="contain" style={styles.cardImage} />
			</View>
			<View style={styles.cardFullDetailsWrapper}>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{fullName}
				</Text>
				{designation ? (
					<>
						<Text numberOfLines={1} style={styles.cardSubTitle}>
							{designation}
						</Text>
						<Spacers height={10} />
					</>
				) : null}
				{description ? (
					<Text numberOfLines={3} style={styles.cardFullDescription}>
						{description}
					</Text>
				) : null}
			</View>
		</TouchableOpacity>
	);
};

export default CompanyCardFull;
