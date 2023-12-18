import { SafeAreaView, View, Text } from 'react-native';
import { Container, Column, SearchElement, Spacers, AppButton, List, ResumeCardFull, CompanyCardFull } from '../../../components';
import React, { useMemo, useState } from 'react';
import styles from '../../../styles';
import { useLocalSearchParams, Stack } from 'expo-router';
import RadioGroup from 'react-native-radio-buttons-group';

const SearchPage = () => {
	const params = useLocalSearchParams();
	const [searchQuery, setSearchQuery] = useState('');
	const [headerTitle, setHeaderTitle] = useState(params.query || '');
	const [searchResults, setSearchResults] = useState(['a', 'b', 'c']);

	// search types
	const searchTypes = useMemo(
		() => [
			{
				id: 'resumes',
				label: 'Resumes',
				value: 'resumes',
			},
			{
				id: 'companies',
				label: 'Companies',
				value: 'companies',
			},
		],
		[]
	);

	const [selectedSearchType, setSelectedSearchType] = useState('resumes');

	const onPress = () => {
		console.log('refresh search');
		setHeaderTitle(searchQuery);

		// do api request
		setSearchResults(['a', 'b', 'c']);
	};
	const onInput = (text) => {
		setSearchQuery(text);
	};
	const onSearchTypeChange = (searchType) => {
		setSearchResults([]);
		setSelectedSearchType(searchType);
	};
	return (
		<SafeAreaView style={styles.screen}>
			<Stack.Screen options={{ title: headerTitle ? `Showing results: ${headerTitle}` : 'Search' }} />
			<Container>
				<Column>
					<SearchElement onInput={onInput} />
					<Spacers />
					<RadioGroup layout="row" radioButtons={searchTypes} onPress={onSearchTypeChange} selectedId={selectedSearchType} />
					<Spacers />
					<AppButton label="Search" onPress={onPress} disabled={searchQuery ? false : true} />
					<Spacers />
					{selectedSearchType == 'companies' ? <List itemArray={searchResults} CardModule={CompanyCardFull} /> : <List itemArray={searchResults} CardModule={ResumeCardFull} />}
				</Column>
			</Container>
		</SafeAreaView>
	);
};

export default SearchPage;
