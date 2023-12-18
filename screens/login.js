import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Container, Column, AppButton, Card, Heading, AppTextInput, Spacers } from '../components';
import styles from '../styles';

export default () => {
	const router = useRouter();
	const goBack = () => router.goBack();
	return (
		<SafeAreaView style={styles.screen}>
			<Container>
				<Column>
					<View style={localStyles.wrapper}>
						<Card>
							<Heading>Login</Heading>
							<AppTextInput placeholder="Email" />
							<Spacers />
							<AppTextInput placeholder="Password" />
							<Spacers />
							<AppButton label="Login" type="primary" />
							<Spacers />
							<Text style={{ textAlign: 'center' }}>OR</Text>
							<Spacers />
							<AppButton label="Register" />
						</Card>
					</View>
				</Column>
			</Container>
		</SafeAreaView>
	);
};

const localStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
	},
});
