import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name="create-company" options={{ title: 'Create Company' }} />
			<Stack.Screen name="[id]/company-image" options={{ title: 'Update Company Image' }} />
			<Stack.Screen name="[id]/update-company" options={{ title: 'Update Company' }} />
			<Stack.Screen name="[id]/departments/create" options={{ title: 'Add Department' }} />
			<Stack.Screen name="[id]/departments/[itemId]/update" options={{ title: 'Update Department' }} />
			<Stack.Screen name="[id]/employees/create" options={{ title: 'Add Employee' }} />
			<Stack.Screen name="[id]/employees/[itemId]/update" options={{ title: 'Update Employee' }} />
			<Stack.Screen name="[id]/services/create" options={{ title: 'Add Service' }} />
			<Stack.Screen name="[id]/services/[itemId]/update" options={{ title: 'Update Service' }} />
		</Stack>
	);
}
