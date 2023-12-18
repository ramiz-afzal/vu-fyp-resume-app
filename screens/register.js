import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Column, AppButton, Card, Heading, AppTextInput, Spacers } from '../components';
import styles from '../styles';

export default () => {
	const router = useRouter();
	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView>
				<Container>
					<Column>
						<View style={localStyles.wrapper}>
							<Card>
								<Heading>Register</Heading>
								<AppTextInput placeholder="First Name" />
								<Spacers />
								<AppTextInput placeholder="Last Name" />
								<Spacers />
								<AppTextInput placeholder="Email" />
								<Spacers />
								<AppTextInput placeholder="Gender" />
								<Spacers />
								<AppTextInput placeholder="Date of birth" />
								<Spacers />
								<AppTextInput placeholder="Password" />
								<Spacers />
								<AppTextInput placeholder="Confirm Password" />
								<Spacers />
								<AppTextInput placeholder="Account Type" />
								<Spacers />
								<AppButton label="Register" type="primary" />
								<Spacers />
								<Text style={{ textAlign: 'center' }}>OR</Text>
								<Spacers />
								<AppButton label="Login" />
							</Card>
						</View>
					</Column>
				</Container>
			</ScrollView>
		</SafeAreaView>
	);
};

const localStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
	},
});
