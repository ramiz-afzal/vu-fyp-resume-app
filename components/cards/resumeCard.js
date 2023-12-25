import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import { profileImageSource } from '../../utils';
import { Spacers } from '../../components';
import { getResumeFullName, getResumeMeta } from '../../utils';

const ResumeCard = ({ item, onPress }) => {
	const fullName = getResumeFullName(item) || 'N/A';
	const designation = getResumeMeta(item, 'designation') || 'N/A';
	const profileImage = item?.image ? item?.image?.path : null;
	const onItemPress = () => {
		if (onPress) {
			onPress();
		}
	};
	return (
		<TouchableOpacity style={styles.resumeCardWrapper} onPress={onItemPress}>
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
