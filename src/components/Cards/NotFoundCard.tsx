import { Card, CardMedia } from '@mui/material';
import notFoundImg from '../../images/notFound.png';
import theme from '../../styles/theme';

const NotFoundCard = () => {
	return (
		<Card
			sx={{
				boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
				backdropFilter: 'blur(4.9px)',
				zIndex: 1,

				width: {
					xs: '12rem',
					sm: '14rem',
					md: '17rem',
				},
				height: {
					xs: '16rem',
					sm: '21rem',
					md: '25rem',
				},
				borderRadius: '1rem',
				border: `0.125rem solid ${theme.palette.secondary.main}`,
				background: 'rgba(29, 51, 53, 0.51)',
				display: 'flex',
				alignItems: 'center',
				marginTop: '-5rem',
			}}
		>
			<CardMedia
				component="img"
				width="100%"
				image={notFoundImg}
				alt="Default Image"
				sx={{
					padding: '2rem',
				}}
			/>
		</Card>
	);
};

export default NotFoundCard;
