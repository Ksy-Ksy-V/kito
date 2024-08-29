import {
	Box,
	Typography,
	Card,
	CardContent,
	Button,
	useTheme,
} from '@mui/material';

interface NewsCardProps {
	title: string;
	date: string;
	author: string;
	excerpt: string;
	imageUrl: string;
	newsUrl: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
	title,
	date,
	author,
	excerpt,
	imageUrl,
	newsUrl,
}) => {
	const theme = useTheme();

	return (
		<Card
			sx={{
				position: 'relative',
				backgroundImage: `url(${imageUrl})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				height: '60vh',
				boxShadow:
					'0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.2)',
				'&:hover .data': {
					transform: 'translateY(0)',
				},
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					padding: '0.8em',
					textAlign: 'center',
				}}
			>
				<Typography
					variant="h5"
					sx={{
						padding: '0.5rem',
						borderRadius: '5px',
						background: 'rgba(29, 51, 53, 0.51)',
					}}
				>
					{new Date(date).toLocaleDateString('en-US', {
						day: 'numeric',
						month: 'short',
						year: 'numeric',
					})}
				</Typography>
			</Box>

			<CardContent
				className="data"
				sx={{
					position: 'absolute',
					bottom: 0,
					width: '100%',
					transform: 'translateY(calc(21vh + 1em))',
					background: 'rgba(29, 51, 53, 0.7)',
					borderRadius: '5px',
					boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
					backdropFilter: 'blur(4.9px)',
					webkitBackdropFilter: 'blur(4.9px)',
					border: '1px solid rgba(29, 51, 53, 0.3)',
				}}
			>
				<Typography
					variant="body2"
					sx={{ color: theme.palette.text.primary, margin: '1rem' }}
				>
					{author}
				</Typography>
				<Typography
					variant="h5"
					sx={{ color: theme.palette.secondary.main, margin: '1rem' }}
				>
					{title}
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: theme.palette.text.primary, margin: '1rem' }}
				>
					{excerpt}
				</Typography>
				<Button
					sx={{ color: theme.palette.secondary.main, margin: '1rem' }}
					href={newsUrl}
					target="_blank"
				>
					See More
				</Button>
			</CardContent>
		</Card>
	);
};

export default NewsCard;
