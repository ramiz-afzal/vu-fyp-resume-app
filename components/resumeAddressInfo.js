import { View, Text } from 'react-native';
import styles from '../styles';

const ResumeAddressInfo = (resume) => {
	const personalInfo = resume.personalInfo || [
		{
			key: 'Address line 1',
			value: '123, St ABC',
		},
		{
			key: 'Address line 2',
			value: 'Lorem ipsum',
		},
		{
			key: 'City',
			value: 'Karachi',
		},
		{
			key: 'State/Province',
			value: 'Sindh',
		},
		{
			key: 'Country',
			value: 'Pakistan',
		},
	];
	return (
		<View style={styles.dataTableWrapper}>
			{personalInfo.length ? (
				personalInfo.map((infoItem, i) => (
					<View style={styles.dataTableRow(personalInfo.length, i)}>
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
