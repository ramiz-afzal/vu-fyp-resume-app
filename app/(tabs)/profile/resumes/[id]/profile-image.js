import { SafeAreaView } from 'react-native';
import React from 'react';
import { ImagePicker, Container, Column } from '../../../../../components';
import styles from '../../../../../styles';

const UpdateProfileImage = () => {
	const onImageSelect = (result) => {
		console.log(result);
	};
	return (
		<SafeAreaView style={styles.screen}>
			<Container>
				<Column>
					<ImagePicker onChange={onImageSelect} />
				</Column>
			</Container>
		</SafeAreaView>
	);
};

export default UpdateProfileImage;
