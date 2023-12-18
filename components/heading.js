import { Text } from 'react-native';
import styles from '../styles';

const Heading = ({ children }) => {
	return <Text style={styles.heading}>{children}</Text>;
};

export default Heading;
