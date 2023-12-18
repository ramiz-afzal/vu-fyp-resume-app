import { useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../../../components';
import styles from '../../../../../styles';
import React from 'react';

const VerifyCompany = () => {
	const companyTitle = 'Syndior PVT LTD';
	const description =
		'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos id pariatur nostrum nemo ab repellat inventore quae, officia, officiis nisi, quo nam exercitationem. Rerum praesentium aperiam reprehenderit eius. Eius nulla soluta fugit in iste similique repudiandae neque illum sint qui, magnam officiis quae labore. Obcaecati itaque architecto assumenda totam deserunt quis voluptatibus necessitatibus voluptatem ea facilis deleniti voluptatum perferendis id laborum sapiente velit quam optio ex blanditiis enim ipsa, consequatur, ducimus porro. Iusto necessitatibus quis ab quasi at consectetur unde voluptas magni ullam! Molestias maiores incidunt eos, ratione consequuntur minus voluptas culpa nesciunt sint inventore quaerat itaque, doloremque perspiciatis deleniti!';
	const onSubmit = () => {
		console.log('onSubmit');
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						<View>
							<Text style={styles.cardSubTitle}>Company Name</Text>
							<Spacers height={5} />
							<View style={styles.textInputField}>
								<Text>{companyTitle}</Text>
							</View>
							<Spacers />
						</View>

						<View>
							<Text style={styles.cardSubTitle}>Company Details</Text>
							<Spacers height={5} />
							<View style={styles.textInputField}>
								<Text>{description}</Text>
							</View>
							<Spacers />
						</View>

						<AppButton label="Approve" type="primary" onPress={onSubmit} />
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

export default VerifyCompany;
