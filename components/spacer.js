import { View } from 'react-native';
import styles from '../styles';

const Spacers = ({ height = 16 }) => {
	return <View style={styles.spacer(height)} />;
};

export default Spacers;
