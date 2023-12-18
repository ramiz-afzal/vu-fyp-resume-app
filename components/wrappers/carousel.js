import { View, FlatList } from 'react-native';
import { SIZES } from '../../constants';

const Carousel = ({ itemArray, CardModule }) => {
	return (
		<View style={{ padding: 0 }}>
			<FlatList
				data={itemArray}
				renderItem={function ({ item }) {
					return <CardModule />;
				}}
				keyExtractor={(item) => item?.id}
				contentContainerStyle={{ columnGap: SIZES.medium }}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default Carousel;
