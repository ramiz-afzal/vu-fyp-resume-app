import { Text, View } from 'react-native';
import { IconButton, Spacers } from '../../components';
import styles from '../../styles';
import { ICONS } from '../../constants';
import { useRouter } from 'expo-router';

const CompanyVerifyCardFull = (item) => {
	const router = useRouter();
	const title = item.title || 'Syndior PVT LTD';
	const description = item.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, reprehenderit.';
	const editItem = () => {
		router.push({
			pathname: '/profile/company-verification/[itemId]',
			params: {
				itemId: 34,
			},
		});
	};
	return (
		<View style={{ ...styles.staticCardWrapper, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
			<View style={{ width: '80%', marginRight: 10 }}>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{title}
				</Text>
				<Spacers height={5} />
				<Text numberOfLines={2} style={styles.text}>
					{description}
				</Text>
			</View>
			<View style={{ flexGrow: 1, flexShrink: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<IconButton iconUrl={ICONS.edit} onPress={editItem} />
			</View>
		</View>
	);
};

export default CompanyVerifyCardFull;
