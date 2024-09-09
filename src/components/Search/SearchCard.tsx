import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActionArea,
} from '@mui/material';

interface SearchCardProps {
	title: string;
	description: string;
	imageUrl: string;
}

function SearchCard({ title, description, imageUrl }: SearchCardProps) {
	return (
		<Card
			sx={{
				position: 'relative',
				overflow: 'hidden',
				'&:hover .MuiCardMedia-root': {
					filter: 'blur(3px)',
					transform: 'scale(0.97)',
				},
				'&:hover .MuiCardContent-root': {
					opacity: 1,
					transform: 'none',
				},
			}}
		>
			<CardActionArea>
				<CardMedia
					component="img"
					image={imageUrl}
					alt={title}
					sx={{
						transition: 'transform 0.2s, filter 0.2s',
					}}
				/>
				<CardContent
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						color: '#fff',
						backgroundColor: 'rgba(29, 51, 53, 0.6)',
						opacity: 0,
						transform: 'scale(1.15)',
						transition: 'opacity 0.2s, transform 0.2s',
						textAlign: 'center',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography variant="h3">{title}</Typography>
					<Typography variant="body2">{description}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default SearchCard;
