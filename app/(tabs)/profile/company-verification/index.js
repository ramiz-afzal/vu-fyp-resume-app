import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Container, Column, CompanyVerifyCardFull, List } from '../../../../components';
import styles from '../../../../styles';
import React from 'react';

const CompanyVerification = () => {
	return (
		<>
			<Stack.Screen options={{ title: 'Verify Company' }} />
			<SafeAreaView style={styles.screen}>
				<Container>
					<Column>
						<List itemArray={['a', 'b', 'c']} CardModule={CompanyVerifyCardFull} />
					</Column>
				</Container>
			</SafeAreaView>
		</>
	);
};

export default CompanyVerification;
