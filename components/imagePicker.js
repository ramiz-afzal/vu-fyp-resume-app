import React, { useState } from 'react';
import { View, Image, SafeAreaView, ScrollView } from 'react-native';
import { defaultImageSource } from '../utils';
import { AppButton, Spacers } from '../components';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';

const ImagePicker = ({ onChange }) => {
	const router = useRouter();
	const [image, setImage] = useState(null);
	const [file, setFile] = useState(null);
	const openFilePicker = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
			console.log(result);
			if (result.canceled === false && result.assets.length > 0) {
				const selectedFile = result.assets[0];
				setImage(selectedFile.uri);
				setFile(selectedFile);
			}
		} catch (err) {
			console.error('Error picking document:', err);
		}
	};
	const updateImage = () => {
		if (onChange) {
			onChange(file);
		}
	};
	return (
		<SafeAreaView>
			<ScrollView>
				<View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
					{!file ? (
						<Image source={defaultImageSource(null)} resizeMode="contain" style={{ width: 300, height: 300, backgroundColor: '#FFFFFF', borderRadius: 12 }} />
					) : (
						<Image source={{ uri: image }} resizeMode="contain" style={{ width: 300, height: 300, backgroundColor: '#FFFFFF', borderRadius: 12 }} />
					)}
				</View>
				{!file ? <AppButton label="Select" onPress={openFilePicker} /> : <AppButton label="Update" type="primary" onPress={updateImage} />}
				<Spacers />
				<AppButton label="Cancel" type="danger" onPress={() => router.back()} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default ImagePicker;
