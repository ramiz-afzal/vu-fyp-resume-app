import { View, Text } from 'react-native';
import styles from '../styles';

const ResumePersonalInfo = (resume) => {
	const personalInfo = resume.personalInfo || [
		{
			key: 'Phone',
			value: '+92 123 4567',
		},
		{
			key: 'Gender',
			value: 'Male',
		},
		{
			key: 'Date of Birth',
			value: '29, April, 1997',
		},
		{
			key: 'Religion',
			value: 'Islam',
		},
		{
			key: 'Martial Status',
			value: 'Single',
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

export default ResumePersonalInfo;
