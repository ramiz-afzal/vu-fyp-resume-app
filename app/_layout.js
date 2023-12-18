import { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
	const [fontsLoaded, fontError] = useFonts({
		DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
		DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
		DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
	});

	useEffect(() => {
		if (fontsLoaded || fontError) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ title: null, headerShown: false }} />
		</Stack>
	);
}
