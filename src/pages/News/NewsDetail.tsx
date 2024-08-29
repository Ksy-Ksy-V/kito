import { Typography, Grid2, Box } from '@mui/material';
import newsImg from '../../images/animeCardPoster.png';

const NewsDetail = () => {
	return (
		<Grid2 container spacing={2}>
			<Grid2
				size={{ xs: 12 }}
				sx={{
					marginTop: '1rem',

					position: 'relative',
					height: '400px',
					width: '100%',
					backgroundImage: `url(${newsImg})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					boxShadow:
						'0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.2)',
					'&::before': {
						content: '""',
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(0, 0, 0, 0.7)',
						zIndex: 1,
					},
				}}
			>
				<Grid2
					size={{ xs: 6 }}
					sx={{
						position: 'relative',
						zIndex: 2,
						padding: '2rem',
						textAlign: 'center',
						// display: 'center',
					}}
				>
					<Typography variant="h2">News Title</Typography>
					<Typography variant="h4">News Author</Typography>
					{/* 
					<Grid2 size={{ xs: 6 }} offset={{ xs: 3 }}> */}
					<Box
						sx={{
							position: 'relative',

							// width: '50%',
							marginTop: '3rem',
							zIndex: 3,
							padding: '2rem',
							textAlign: 'center',
							background: 'rgba(29, 51, 53, 0.7)',
							borderRadius: '5px',
							boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
							backdropFilter: 'blur(4.9px)',
							webkitBackdropFilter: 'blur(4.9px)',
							border: '1px solid rgba(29, 51, 53, 0.3)',
						}}
					>
						<Typography variant="body1">
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip
							ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore
							eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia
							deserunt mollit anim id est laborum. Lorem ipsum
							dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna
							aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea
							commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore
							eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia
							deserunt mollit anim id est laborum. Lorem ipsum
							dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna
							aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea
							commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore
							eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia
							deserunt mollit anim id est laborum.
						</Typography>
						<Typography variant="body2">News Date</Typography>
					</Box>
					{/* </Grid2> */}
				</Grid2>
			</Grid2>
		</Grid2>
	);
};

export default NewsDetail;
