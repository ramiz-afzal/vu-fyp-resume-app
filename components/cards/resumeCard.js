import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import { profileImageSource } from '../../utils';
import { Spacers } from '../../components';
import { useRouter } from 'expo-router';

const ResumeCard = ({ fullName = 'N/A', designation = 'N/A', profileImage = null }) => {
	const router = useRouter();
	const onPress = () => {
		router.push('/resumes/1');
	};
	return (
		<TouchableOpacity style={styles.resumeCardWrapper} onPress={onPress}>
			<View>
				<Image source={profileImageSource(profileImage)} resizeMode="contain" style={styles.cardImage} />
			</View>
			<Spacers height={10} />
			<View>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{fullName}
				</Text>
				<Text numberOfLines={1} style={styles.cardSubTitle}>
					{designation}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ResumeCard;
