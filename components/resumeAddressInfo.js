import { View, Text } from 'react-native';
import styles from '../styles';
import { getResumeMeta } from '../utils';

const ResumeAddressInfo = ({ resume }) => {
	const address_1 = getResumeMeta(resume, 'address_1') || 'N/A';
	const address_2 = getResumeMeta(resume, 'address_2') || 'N/A';
	const city = getResumeMeta(resume, 'city') || 'N/A';
	const state = getResumeMeta(resume, 'state') || 'N/A';
	const country = getResumeMeta(resume, 'country') || 'N/A';
	const personalInfo = [
		{
			key: 'Address line 1',
			value: address_1,
		},
		{
			key: 'Address line 2',
			value: address_2,
		},
		{
			key: 'City',
			value: city,
		},
		{
			key: 'State/Province',
			value: state,
		},
		{
			key: 'Country',
			value: country,
		},
	];
	return (
		<View style={styles.dataTableWrapper}>
			{personalInfo.length ? (
				personalInfo.map((infoItem, i) => (
					<View style={styles.dataTableRow(personalInfo.length, i)} key={i}>
						<View style={styles.dataTableItem}>
							<Text style={styles.dataTableItemLabel}>{infoItem.key}</Text>
						</View>
						<View style={styles.dataTableItem}>
							<Text style={styles.dataTableItemValue}>{infoItem.value}</Text>
						</View>
					</View>
				))
			) : (
				<View>
					<View>
						<Text>No personal data available</Text>
					</View>
				</View>
			)}
		</View>
	);
};

export default ResumeAddressInfo;
