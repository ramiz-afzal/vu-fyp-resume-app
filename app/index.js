import React from 'react';
import { Redirect, Stack } from 'expo-router';

const StartPage = () => {
	return (
		<>
			<Stack.Screen options={{ title: null, headerShown: false }} />
			<Redirect href="/home" />
		</>
	);
};

export default StartPage;
