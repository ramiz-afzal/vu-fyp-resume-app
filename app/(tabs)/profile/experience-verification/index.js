import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Container, Column, ExperienceVerifyCardFull, List } from '../../../../components';
import styles from '../../../../styles';
import React from 'react';

const ExperienceVerification = () => {
	return (
		<>
			<Stack.Screen options={{ title: 'Verify User Work Experience' }} />
			<SafeAreaView style={styles.screen}>
				<Container>
					<Column>
						<List itemArray={['a', 'b', 'c']} CardModule={ExperienceVerifyCardFull} />
					</Column>
				</Container>
			</SafeAreaView>
		</>
	);
};

export default ExperienceVerification;
