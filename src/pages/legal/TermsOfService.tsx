import { Box, Grid2, Typography } from '@mui/material';
import theme from '../../styles/theme';
import termsBackground from '../../images/termsBackground.jpg';
import { useState } from 'react';

const TermsOfService = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Grid2 container spacing={2}>
			<Grid2
				size={12}
				sx={{
					position: 'relative',
					width: '100vw',
					left: '50%',
					right: '50%',
					marginLeft: '-50vw',
					marginRight: '-50vw',
					marginTop: '1rem',
					height: {
						xs: '150px',
						sm: '250px',
						md: '300px',
						lg: '400px',
						xl: '400px',
					},
					zIndex: '0',
					backgroundImage: `url(${termsBackground})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					'&::before': {
						content: '""',
						position: 'absolute',
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						top: 0,
						left: 0,
						zIndex: 1,
					},
				}}
			>
				<Box
					sx={{
						position: 'relative',
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						zIndex: 2,
					}}
				>
					<Typography
						variant="h1"
						sx={{
							textAlign: 'center',
							fontSize: {
								xs: theme.typography.h4.fontSize,
								sm: theme.typography.h3.fontSize,
								md: theme.typography.h2.fontSize,
								lg: theme.typography.h2.fontSize,
								xl: theme.typography.h1.fontSize,
							},
						}}
					>
						Terms of Service
					</Typography>
				</Box>
			</Grid2>
		</Grid2>
	);
};

export default TermsOfService;
