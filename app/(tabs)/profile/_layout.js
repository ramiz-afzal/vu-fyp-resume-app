import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: 'Profile' }} />
			<Stack.Screen name="login" options={{ title: 'Login' }} />
			<Stack.Screen name="register" options={{ title: 'Register' }} />
			<Stack.Screen name="forgot-password" options={{ title: 'Reset Password' }} />
			<Stack.Screen name="change-password" options={{ title: 'Change Password' }} />
			<Stack.Screen name="update-password" options={{ title: 'Change Password' }} />
			<Stack.Screen name="verify-token" options={{ title: 'Verify Token' }} />
			<Stack.Screen name="experience-verification" options={{ headerShown: false }} />
			<Stack.Screen name="company-verification" options={{ headerShown: false }} />
			<Stack.Screen name="resumes" options={{ headerShown: false }} />
			<Stack.Screen name="companies" options={{ headerShown: false }} />
		</Stack>
	);
}
