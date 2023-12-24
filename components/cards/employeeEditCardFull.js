import { Text, View } from 'react-native';
import { IconButton, Spacers } from '../../components';
import styles from '../../styles';
import { ICONS } from '../../constants';
import { getResumeFullName } from '../../utils';

const EmployeeEditCardFull = ({ item, onButtonPress }) => {
	const fullName = getEmployeeName(item) || 'N/A';
	const designation = getEmployeeDesignation(item) || 'N/A';
	const employmentType = item.employmentType && item.employmentType == 'working' ? 'Working' : item.employmentType && item.employmentType == 'former' ? 'Former' : 'N/A';
	const employmentPosition = item.employmentPosition && item.employmentPosition == 'fullTime' ? 'Full Time' : item.employmentPosition && item.employmentPosition == 'partTime' ? 'Part Time' : item.employmentPosition && item.employmentPosition == 'intern' ? 'Intern' : 'N/A';
	function getEmployeeDesignation(employee) {
		let employeeDesignation = '';
		if (employee) {
			if (employee.type == 'educated' && employee.resume) {
				employee.resume.experience.forEach((exp) => {
					if (exp.company && employee.department && exp.company.id == employee.department.companyId) {
						employeeDesignation = exp.designation;
					}
				});
			} else if (employee.type == 'illiterate' && employee.illiterateEmployee) {
				employeeDesignation = employee.illiterateEmployee.designation || 'N/A';
			}
		}
		return employeeDesignation;
	}
	function getEmployeeName(employee) {
		let employeeName = '';
		if (employee) {
			if (employee.type == 'educated' && employee.resume) {
				employeeName = getResumeFullName(employee.resume);
			} else if (employee.type == 'illiterate' && employee.illiterateEmployee) {
				employeeName = employee.illiterateEmployee.firstName && employee.illiterateEmployee.lastName ? `${employee.illiterateEmployee.firstName} ${employee.illiterateEmployee.lastName}` : employee.illiterateEmployee.firstName ? employee.illiterateEmployee.firstName : 'N/A';
			}
		}
		return employeeName;
	}
	const editItem = () => {
		if (onButtonPress) {
			onButtonPress();
		}
	};
	return (
		<View style={{ ...styles.staticCardWrapper, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
			<View style={{ width: '80%', marginRight: 10 }}>
				<Text numberOfLines={1} style={styles.cardTitle}>
					{fullName}
				</Text>
				<Spacers height={5} />
				<Text numberOfLines={1} style={styles.cardSubTitle}>
					{designation}
				</Text>
				<Spacers height={5} />
				<Text numberOfLines={1} style={styles.cardSubTitle}>
					Position: {employmentPosition}, Type: {employmentType}
				</Text>
			</View>
			<View style={{ flexGrow: 1, flexShrink: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<IconButton iconUrl={ICONS.edit} onPress={editItem} />
			</View>
		</View>
	);
};

export default EmployeeEditCardFull;
