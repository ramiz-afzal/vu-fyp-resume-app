import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import { profileImageSource } from '../../utils';
import { Spacers } from '../../components';
import { getResumeFullName, getResumeMeta } from '../../utils';

const ResumeCardFull = ({ item, onPress }) => {
	const fullName = getResumeFullName(item) || 'N/A';
	const designation = getResumeMeta(item, 'designation') || 'N/A';
	const description = getResumeMeta(item, 'biography') || 'N/A';
	const profileImage = item?.image ? item?.image?.path : null;
	const onItemPress = () => {
		if (onPress) {
			onPress();
		}
	};
	return (
		<TouchableOpacity style={styles.companyCardFullWrapper} onPress={onItemPress}>
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

export default ResumeCardFull;
