import { Platform, SafeAreaView } from 'react-native';
import React from 'react';
import { ImagePicker, Container, Column } from '../../../../../components';
import styles from '../../../../../styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import authService from '../../../../../services/auth';
import axios from '../../../../../services/axios';
const CompanyImage = () => {
	const params = useLocalSearchParams();
	const router = useRouter();
	const onImageSelect = async (file) => {
		if (!file) {
			alert('Something went wrong');
			return;
		}

		let formData = new FormData();
		formData.append('file', {
			name: file.name,
			type: file.mimeType,
			uri: Platform.OS === 'ios' ? file.uri.replace('file://', '') : file.uri,
		});
		try {
			const token = await authService.getBearerToken();
			const response = await axios.post(`/file`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			});
			if (response && response.status == 200 && response.data.file) {
				let fileId = response.data.file.id;

				// delete old profile image
				(async function () {
					let imageId = params.oldImageId;
					if (imageId) {
						const token = await authService.getBearerToken();
						await axios.delete(`/file/${imageId}`, {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						});
					}
				})();

				// update company
				(async function () {
					let requestParams = {};
					requestParams.imageId = fileId;
					const token = await authService.getBearerToken();
					await axios.patch(
						`/company/${params.id}`,
						{ body: requestParams },
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
				})();

				alert('Image Updated');
				router.replace(`/profile/companies/${params.id}/update-company`);
			}
		} catch (error) {
			console.log(error.message);
			console.log(error.response.data);
			alert('Something went wrong.');
		}
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

export default CompanyImage;
