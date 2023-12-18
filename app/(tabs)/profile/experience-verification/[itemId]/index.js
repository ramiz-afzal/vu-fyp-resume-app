import { useRouter } from 'expo-router';
import { SafeAreaView, Text, View, TextInput, ScrollView } from 'react-native';
import { Container, Column, AppButton, Spacers } from '../../../../../components';
import styles from '../../../../../styles';
import React from 'react';

const VerifyWorkExperience = () => {
	const fullName = 'John Doe';
	const designation = 'React Developer';
	const department = 'Frontend Developers';
	const employmentType = 'Fulltime Employee';
	const startDate = '1st Jan, 2022';
	const endDate = '30th Dec, 2022';
	const onSubmit = () => {
		console.log('onSubmit');
	};
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						<View>
							<Text style={styles.cardSubTitle}>Name</Text>
							<Spacers height={5} />
							<View style={styles.textInputField}>
								<Text>{fullName}</Text>
							</View>
							<Spacers />
						</View>

						<View>
							<Text style={styles.cardSubTitle}>Designation</Text>
							<Spacers height={5} />
							<View style={styles.textInputField}>
								<Text>{designation}</Text>
							</View>
							<Spacers />
						</View>

						<View>
							<Text style={styles.cardSubTitle}>Department</Text>
							<Spacers height={5} />
							<View style={styles.textInputField}>
								<Text>{department}</Text>
							</View>
							<Spacers />
						</View>

						<View>
							<Text style={styles.cardSubTitle}>Employment Type</Text>
							<Spacers height={5} />
							<View style={styles.textInputField}>
								<Text>{employmentType}</Text>
							</View>
							<Spacers />
						</View>

						<View>
							<Text style={styles.cardSubTitle}>Joining Date</Text>
							<Spacers height={5} />
							<View style={styles.textInputField}>
								<Text>{startDate}</Text>
							</View>
							<Spacers />
						</View>

						<View>
							<Text style={styles.cardSubTitle}>Leaving Date</Text>
							<Spacers height={5} />
							<View style={styles.textInputField}>
								<Text>{endDate}</Text>
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

export default VerifyWorkExperience;
