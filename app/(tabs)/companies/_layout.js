import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name="index" options={{ title: 'Companies XX' }} />
			<Stack.Screen name="[id]/index" options={{ title: 'Company' }} />
			<Stack.Screen name="[id]/employees" options={{ title: 'Company Employees' }} />
			<Stack.Screen name="[id]/services" options={{ title: 'Company Services' }} />
		</Stack>
	);
}
