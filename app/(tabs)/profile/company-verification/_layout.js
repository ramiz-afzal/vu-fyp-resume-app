import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name="[itemId]/index" options={{ title: 'Verify' }} />
		</Stack>
	);
}
