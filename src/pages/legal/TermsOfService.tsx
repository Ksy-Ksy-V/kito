import { Grid2, Typography } from '@mui/material';
import theme from '../../styles/theme';
import termsBackground from '../../images/termsBackground.jpg';
import {
	termsOfService,
	WelcomeTermsOfService,
} from '../../data/termsOfService';
import BackgroundImg from '../../components/BackgroundImg';

const TermsOfService = () => {
	return (
		<Grid2 container spacing={2}>
			<Grid2 size={12}>
				<BackgroundImg
					title={'Terms of Service'}
					backgroundImage={termsBackground}
					height={{
						xs: '150px',
						sm: '250px',
						md: '300px',
						lg: '400px',
						xl: '400px',
					}}
				/>
			</Grid2>

			<Typography
				variant="h5"
				sx={{
					color: theme.palette.secondary.main,
					textAlign: 'center',
					marginBottom: '1rem',
					marginTop: '1rem',
					fontSize: {
						xs: theme.typography.body1.fontSize,
						sm: theme.typography.h5.fontSize,
						md: theme.typography.h5.fontSize,
						lg: theme.typography.h5.fontSize,
						xl: theme.typography.h4.fontSize,
					},
				}}
			>
				{WelcomeTermsOfService[0].content}
			</Typography>

			{termsOfService.map((term) => (
				<Grid2
					container
					spacing={2}
					size={12}
					key={term.id}
					sx={{
						padding: {
							xs: '1rem',
							sm: '1rem',
							md: '1.5rem',
						},
						backgroundColor: theme.palette.primary.dark,
						borderRadius: '12px',
						boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
						position: 'relative',
					}}
				>
					<Grid2 size={12}>
						<Typography
							variant="h4"
							sx={{
								color: theme.palette.secondary.main,
								fontSize: {
									xs: theme.typography.h5.fontSize,
									sm: theme.typography.h5.fontSize,
									md: theme.typography.h5.fontSize,
									lg: theme.typography.h5.fontSize,
									xl: theme.typography.h4.fontSize,
								},
							}}
						>
							{term.title}
						</Typography>
					</Grid2>
					<Grid2 size={12}>
						{term.content.map((text, index) => {
							if (text.trim().startsWith('-')) {
								return (
									<Typography
										key={index}
										variant="body1"
										component="li"
										sx={{
											marginLeft: '1.5rem',
											listStyleType: 'disc',
										}}
									>
										{text.replace('-', '').trim()}
									</Typography>
								);
							} else {
								return (
									<Typography key={index} variant="body1">
										{text}
									</Typography>
								);
							}
						})}
					</Grid2>
				</Grid2>
			))}
		</Grid2>
	);
};

export default TermsOfService;
