import { SafeAreaView } from 'react-native';
import { Container, Column, CompanyCardFull, List } from '../../../components';
import styles from '../../../styles';

export default () => {
	return (
		<SafeAreaView style={styles.screen}>
			<Container>
				<Column>
					<List itemArray={['a', 'b', 'c']} CardModule={CompanyCardFull} />
				</Column>
			</Container>
		</SafeAreaView>
	);
};
