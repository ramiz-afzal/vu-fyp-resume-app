import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import { profileImageSource, getResumeFullName, getResumeMeta } from '../../utils';
import { useEffect, useState } from 'react';

const EmployeeCardFull = ({ item, onPress }) => {
	const [fullName, setFullName] = useState('N/A');
	const [designation, setDesignation] = useState('N/A');
	const [profileImage, setProfileImage] = useState(null);

	useEffect(() => {
		if (item?.type == 'educated') {
			let fullName = getResumeFullName(item?.resume);
			let designation = getResumeMeta(item?.resume, 'designation');
			let profileImage = item?.resume?.image?.path || null;
			setFullName(fullName);
			setDesignation(designation);
			setProfileImage(profileImage);
		} else if (item?.type == 'illiterate') {
			let fullName = `${item?.illiterateEmployee?.firstName} ${item?.illiterateEmployee?.lastName}`;
			let designation = item?.illiterateEmployee?.designation;
			setFullName(fullName);
			setDesignation(designation);
			setProfileImage(null);
		}
	}, []);

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
				<Text numberOfLines={1} style={styles.cardSubTitle}>
					{designation}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default EmployeeCardFull;
