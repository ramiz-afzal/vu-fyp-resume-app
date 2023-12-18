import { Text, View } from 'react-native';
import { Spacers } from '../../components';
import styles from '../../styles';

const CertificateCardFull = (item) => {
	const certificateTitle = item.certificateTitle || 'Certificate Title';
	const instituteTitle = item.instituteTitle || 'School or Collage';
	const description = item.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, reprehenderit.';

	return (
		<View style={styles.staticCardWrapper}>
			<Text numberOfLines={1} style={styles.cardTitle}>
				{certificateTitle}
			</Text>
			<Spacers height={5} />
			<Text numberOfLines={1} style={styles.cardSubTitle}>
				{instituteTitle}
			</Text>
			<Spacers height={5} />
			{description ? <Text style={styles.text}>{description}</Text> : null}
		</View>
	);
};

export default CertificateCardFull;
