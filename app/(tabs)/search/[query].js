import { SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { Container, Column, SearchElement, Spacers, AppButton, ResumeCardFull, CompanyCardFull } from '../../../components';
import React, { useEffect, useMemo, useState } from 'react';
import styles from '../../../styles';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import RadioGroup from 'react-native-radio-buttons-group';
import authService from '../../../services/auth';
import axios from '../../../services/axios';
import { COLORS, SIZES } from '../../../constants';

const SearchPage = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const [searchQuery, setSearchQuery] = useState('');
	const [headerTitle, setHeaderTitle] = useState(params.query || '');
	const [searchResults, setSearchResults] = useState([]);
	const [searchResultsLoaded, setSearchResultsLoaded] = useState(false);
	const [selectedSearchType, setSelectedSearchType] = useState('resumes');

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

	async function doSearch() {
		try {
			const token = await authService.getBearerToken();
			if (selectedSearchType == 'resumes') {
				const response = await axios.get(`/resume/search/${params.query}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response && response.status == 200 && response.data.resumes) {
					setSearchResults(response.data.resumes);
					setSearchResultsLoaded(true);
				}
			} else if (selectedSearchType == 'companies') {
				const response = await axios.get(`/company/search/${params.query}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response && response.status == 200 && response.data.companies) {
					setSearchResults(response.data.companies);
					setSearchResultsLoaded(true);
				}
			}
		} catch (error) {
			console.log(error);
			console.log(error.response.data);
			setSearchResults([]);
			setSearchResultsLoaded(true);
		}
	}

	useEffect(() => {
		doSearch();
		return () => {
			setSearchResults([]);
			setSearchResultsLoaded(false);
		};
	}, []);

	const onPress = () => {
		setHeaderTitle(searchQuery);
		setSearchResults([]);
		setSearchResultsLoaded(false);
		doSearch();
	};
	const onInput = (text) => {
		router.setParams({ query: text });
		setSearchQuery(text);
	};
	const onSearchTypeChange = (searchType) => {
		setSelectedSearchType(searchType);
		setSearchResults([]);
	};
	return (
		<SafeAreaView style={styles.screen}>
			<Stack.Screen options={{ title: headerTitle ? `Showing results: ${headerTitle}` : 'Search' }} />
			{searchResultsLoaded ? (
				<Container>
					<Column>
						<SearchElement onInput={onInput} />
						<Spacers />
						<RadioGroup layout="row" radioButtons={searchTypes} onPress={onSearchTypeChange} selectedId={selectedSearchType} />
						<Spacers />
						<AppButton label="Search" onPress={onPress} disabled={searchQuery ? false : true} />
						<Spacers />
						{selectedSearchType == 'resumes' && (
							<FlatList
								data={searchResults}
								renderItem={function ({ item, index }) {
									return <ResumeCardFull item={item} index={index} onPress={() => router.replace(`/resumes/${item?.id}`)} />;
								}}
								keyExtractor={(item) => item?.id}
								contentContainerStyle={{ columnGap: SIZES.medium }}
							/>
						)}
						{selectedSearchType == 'companies' && (
							<FlatList
								data={searchResults}
								renderItem={function ({ item, index }) {
									return <CompanyCardFull item={item} index={index} onPress={() => router.replace(`/companies/${item?.id}`)} />;
								}}
								keyExtractor={(item) => item?.id}
								contentContainerStyle={{ columnGap: SIZES.medium }}
							/>
						)}
					</Column>
				</Container>
			) : (
				<ActivityIndicator color={COLORS.accent} size={'large'} />
			)}
		</SafeAreaView>
	);
};

export default SearchPage;
