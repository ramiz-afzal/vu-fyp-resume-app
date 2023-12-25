import { Text, View } from 'react-native';
import { Spacers } from '../../components';
import styles from '../../styles';

const ServiceCardFull = ({ item }) => {
	const certificateTitle = item.title || 'N/A';
	const description = item.description || 'N/A';

	return (
		<View style={styles.staticCardWrapper}>
			<Text numberOfLines={1} style={styles.cardTitle}>
				{certificateTitle}
			</Text>
			<Spacers height={5} />
			{description ? <Text style={styles.text}>{description}</Text> : null}
		</View>
	);
};

export default ServiceCardFull;
