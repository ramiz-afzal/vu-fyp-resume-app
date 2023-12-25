import { View, Text } from 'react-native';
import styles from '../styles';
import { getResumeMeta, dateFormat } from '../utils';

const ResumePersonalInfo = ({ resume }) => {
	const phone = getResumeMeta(resume, 'phone');
	const gender = getResumeMeta(resume, 'gender') == 'male' ? 'Male' : getResumeMeta(resume, 'gender') == 'female' ? 'Female' : 'N/A';
	const dob = dateFormat(getResumeMeta(resume, 'dob'));
	const religion = getResumeMeta(resume, 'religion');
	const martial_status = getResumeMeta(resume, 'martial_status') == 'single' ? 'Single' : getResumeMeta(resume, 'martial_status') == 'married' ? 'Married' : 'N/A';
	const personalInfo = [
		{
			label: 'Phone',
			value: phone,
		},
		{
			label: 'Gender',
			value: gender,
		},
		{
			label: 'Date of Birth',
			value: dob,
		},
		{
			label: 'Religion',
			value: religion,
		},
		{
			label: 'Martial Status',
			value: martial_status,
		},
	];
	return (
		<View style={styles.dataTableWrapper}>
			{personalInfo.length ? (
				personalInfo.map((infoItem, i) => (
					<View style={styles.dataTableRow(personalInfo.length, i)} key={i}>
						<View style={styles.dataTableItem}>
							<Text style={styles.dataTableItemLabel}>{infoItem.label}</Text>
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
