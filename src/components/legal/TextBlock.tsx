import { Grid2, Typography } from '@mui/material';
import theme from '../../styles/theme';
import { TextBlockProps } from '../../models/Interfaces';

const TextBlock: React.FC<TextBlockProps> = ({ welcomeText, itemText }) => {
	return (
		<Grid2 container spacing={2}>
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
				{welcomeText[0].content}
			</Typography>

			{itemText.map((item) => (
				<Grid2
					container
					spacing={2}
					size={12}
					key={item.id}
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
							{item.title}
						</Typography>
					</Grid2>
					<Grid2 size={12}>
						{item.content.map((item, index) => {
							if (item.trim().startsWith('-')) {
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
										{item.replace('-', '').trim()}
									</Typography>
								);
							} else {
								return (
									<Typography key={index} variant="body1">
										{item}
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

export default TextBlock;
