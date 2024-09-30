import { AnimeSearchOrder } from '@tutkli/jikan-ts';
import StyledSarchFilters from './StyledSelectFilters';

const SearchSorting = () => {
	return (
		<>
			<StyledSarchFilters
				label="Sort By"
				value={selectedOrder}
				onChange={(event) =>
					setSelectedOrder(event.target.value as AnimeSearchOrder)
				}
				options={[
					{ label: 'Popularity', value: 'popularity' },
					{ label: 'Score', value: 'score' },
					{ label: 'Members', value: 'members' },
				]}
				clearValue={() => setSelectedOrder('popularity')}
			/>
		</>
	);
};

export default SearchSorting;
