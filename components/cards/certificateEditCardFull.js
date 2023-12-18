import { Text, View } from 'react-native';
import { IconButton, Spacers } from '../../components';
import styles from '../../styles';
import { ICONS } from '../../constants';
import { useRouter } from 'expo-router';

const CertificateEditCardFull = (item) => {
	const router = useRouter();
	const certificateTitle = item.certificateTitle || 'Certificate Title';
	const instituteTitle = item.instituteTitle || 'School or Collage';
	const description = item.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, reprehenderit.';
	const editItem = () => {
		router.push({
			pathname: '/profile/resumes/[id]/certificates/[itemId]/update',
			params: {
				id: 12,
				itemId: 34,
			},
		});
	};
	return (
		<View style={{ ...styles.staticCardWrapper, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
			<View style={{ width: '80%', marginRight: 10 }}>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{certificateTitle}
				</Text>
				<Spacers height={5} />
				<Text numberOfLines={1} style={styles.cardSubTitle}>
					{instituteTitle}
				</Text>
				<Spacers height={5} />
				{description ? (
					<Text numberOfLines={2} style={styles.text}>
						{description}
					</Text>
				) : null}
			</View>
			<View style={{ flexGrow: 1, flexShrink: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<IconButton iconUrl={ICONS.edit} onPress={editItem} />
			</View>
		</View>
	);
};

export default CertificateEditCardFull;
