import { Typography, Grid2, Box } from '@mui/material';
import newsImg from '../../images/animeCardPoster.png';

const NewsDetail = () => {
	return (
		<Box
			sx={{
				position: 'relative',
				width: '100vw',
				left: '50%',
				right: '50%',
				marginLeft: '-50vw',
				marginRight: '-50vw',
			}}
		>
			<Grid2
				container
				spacing={2}
				sx={{ width: '100%', maxWidth: '100%' }}
			>
				<Grid2
					size={{ xs: 12 }}
					sx={{
						position: 'relative',
						height: '400px',
						width: '100%',
						backgroundImage: `url(${newsImg})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						marginTop: '1rem',
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
				></Grid2>

				<Grid2
					container
					spacing={2}
					sx={{
						width: '100%',
						maxWidth: '100%',
						position: 'absolute',
						top: 0,
						left: 0,
						height: '400px',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 2,
					}}
				>
					<Grid2
						size={{ xs: 6 }}
						sx={{
							position: 'relative',
							zIndex: 2,
							padding: '2rem',
							textAlign: 'center',
						}}
					>
						<Typography variant="h2">News Title</Typography>
						<Typography variant="h4">News Author</Typography>

						<Box
							sx={{
								position: 'relative',
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
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua...
							</Typography>
							<Typography variant="body2">News Date</Typography>
						</Box>
					</Grid2>
				</Grid2>
			</Grid2>
		</Box>
	);
};

export default NewsDetail;
