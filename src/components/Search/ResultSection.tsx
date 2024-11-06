import { Box, Grid2, keyframes } from '@mui/material';

import ErrorSection from './ErrorSection';
import EmptyResult from './EmptyResult';
import CardSection from './CardSection';

import kitoLoading from '../../images/loading.png';
import { useMemo } from 'react';
import { useSearchContext } from '../../context/SearchContext';

const ResultSection = () => {
	const { state } = useSearchContext();
	const pulse = useMemo(
		() => keyframes`
			0% { transform: scale(1); }
			50% { transform: scale(1.2); }
			100% { transform: scale(1); }
		`,
		[]
	);

	return (
		<>
			{state.loading ? (
				<Grid2
					size={12}
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
						minHeight: '50vh',
					}}
				>
					<Grid2 container>
						<Grid2
							size={12}
							sx={{
								justifyContent: 'center',
								alignItems: 'center',
								display: 'flex',
							}}
						>
							<Box
								component="img"
								src={kitoLoading}
								sx={{
									width: {
										xs: '10rem',
										sm: '20rem',
										xl: '25rem',
									},
									marginTop: {
										xs: '0',
										sm: '2rem',
										xl: '5rem',
									},
									animation: `${pulse} 5s ease-in-out infinite`,
								}}
							/>
						</Grid2>
					</Grid2>
				</Grid2>
			) : state.error ? (
				<ErrorSection />
			) : state.animeList.length === 0 ? (
				<Grid2
					container
					justifyContent={'center'}
					textAlign={'center'}
					size={12}
				>
					<EmptyResult />
				</Grid2>
			) : (
				<CardSection />
			)}
		</>
	);
};

export default ResultSection;
