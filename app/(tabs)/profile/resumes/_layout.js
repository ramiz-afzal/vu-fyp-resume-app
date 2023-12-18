import { Stack } from 'expo-router';

export default function Layout() {
	return (
		<Stack>
			<Stack.Screen name="create-resume" options={{ title: 'Create Resume' }} />
			<Stack.Screen name="[id]/profile-image" options={{ title: 'Update Profile Image' }} />
			<Stack.Screen name="[id]/update-resume" options={{ title: 'Update Resume' }} />
			<Stack.Screen name="[id]/work-experience/create" options={{ title: 'Add Work Experience' }} />
			<Stack.Screen name="[id]/work-experience/[itemId]/update" options={{ title: 'Update Work Experience' }} />
			<Stack.Screen name="[id]/education/create" options={{ title: 'Add Education' }} />
			<Stack.Screen name="[id]/education/[itemId]/update" options={{ title: 'Update Education' }} />
			<Stack.Screen name="[id]/certificates/create" options={{ title: 'Add Certificate' }} />
			<Stack.Screen name="[id]/certificates/[itemId]/update" options={{ title: 'Update Certificate' }} />
		</Stack>
	);
}
