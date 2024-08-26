import {
	Box,
	Card,
	CardMedia,
	CardContent,
	Typography,
	CardActionArea,
} from '@mui/material';
import img from '../images/animeCardPoster.png';

const titleItems = [
	{
		title: 'Hells Paradise',
		description:
			'Gabimaru reigns as the strongest and most ruthless assassin in his village. But now finds himself on death row—with only one way out: retrieve the Elixir of Life from a sinister island. Longing for freedom, he accepts the challenge. But with fellow convicts vying for the same prize and demonic beasts lurking, how will Gabimaru survive this harrowing quest?',
		imageUrl: img,
	},
];

function CardAnime() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
			}}
		>
			{titleItems.map((item, index) => (
				<Card
					key={index}
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
							image={item.imageUrl}
							alt={item.title}
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
							<Typography variant="h3">{item.title}</Typography>
							<Typography variant="body2">
								{item.description}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			))}
		</Box>
	);
}

export default CardAnime;
