import { Tabs } from 'expo-router/tabs';

export default function Layout() {
	return (
		<Tabs
			screenOptions={{
				tabBarLabelStyle: {
					fontSize: 14,
					marginBottom: 14,
				},
			}}
		>
			<Tabs.Screen name="home" options={{ headerShown: false, title: 'Home', tabBarIcon: () => null }} />
			<Tabs.Screen name="resumes/index" options={{ title: 'Resumes', tabBarIcon: () => null }} />
			<Tabs.Screen name="companies" options={{ headerShown: false, title: 'Companies', tabBarIcon: () => null }} />
			<Tabs.Screen name="profile" options={{ headerShown: false, title: 'Profile', tabBarIcon: () => null }} />
			<Tabs.Screen name="resumes/[id]/index" options={{ href: null }} />
			<Tabs.Screen name="search" options={{ href: null, headerShown: false }} />
		</Tabs>
	);
}
