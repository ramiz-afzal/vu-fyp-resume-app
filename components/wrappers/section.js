import { useState, createContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants';
import styles from '../../styles';

export const SectionContext = createContext(null);

const Section = ({ titleText, viewAllText, viewAllCallback, children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const onPress = () => {
		if (viewAllCallback) {
			viewAllCallback();
		}
	};
	return (
		<View style={styles.sectionWrapper}>
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>{titleText}</Text>
				{viewAllText && viewAllCallback ? (
					<TouchableOpacity style={styles.sectionTitleAltWrapper} onPress={onPress}>
						<Text style={styles.sectionTitleAlt}>{viewAllText}</Text>
					</TouchableOpacity>
				) : viewAllText && !viewAllCallback ? (
					<Text style={styles.sectionTitleAlt}>{viewAllText}</Text>
				) : null}
			</View>

			<SectionContext.Provider value={{ isLoading, setIsLoading }}>{isLoading ? <ActivityIndicator size="large" color={COLORS.primary} /> : <View>{children}</View>}</SectionContext.Provider>
		</View>
	);
};

export default Section;
