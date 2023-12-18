import { View } from 'react-native';
import styles from '../styles';

const Column = ({ flex = 1, children }) => {
	return <View style={styles.column(flex)}>{children}</View>;
};

export default Column;
