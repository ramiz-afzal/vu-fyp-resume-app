import { FlatList } from 'react-native';
import { SIZES } from '../../constants';

const List = ({ itemArray, CardModule }) => {
	return (
		<FlatList
			data={itemArray}
			renderItem={function ({ item }) {
				return <CardModule item={item} />;
			}}
			keyExtractor={(item) => item?.id}
			contentContainerStyle={{ columnGap: SIZES.medium }}
		/>
	);
};

export default List;
