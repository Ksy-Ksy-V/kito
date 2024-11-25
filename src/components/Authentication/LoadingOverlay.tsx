import { Box, keyframes } from '@mui/material';
import theme from '../../styles/theme';

const LoadingOverlay = () => {
	const rotate = keyframes`
	  0% { transform: rotate(0deg); }
	  100% { transform: rotate(285deg); }
	`;

	const dash = keyframes`
	  0% { stroke-dashoffset: 187; }
	  50% {
		stroke-dashoffset: 46.75;
		transform: rotate(135deg);
	  }
	  100% {
		stroke-dashoffset: 187;
		transform: rotate(460deg);
	  }
	`;

	const colors = keyframes`
	0% { stroke: ${theme.palette.secondary.main}; } 
    50% { stroke: ${theme.palette.primary.main}; } 
    100% { stroke: ${theme.palette.secondary.main}; }
	`;

	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				backgroundColor: 'rgba(0, 0, 0, 0.6)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 1300,
			}}
		>
			<Box
				component="svg"
				sx={{
					animation: `${rotate} 1.4s linear infinite`,
					width: '100px',
					height: '100px',
				}}
				viewBox="0 0 66 66"
			>
				<Box
					component="circle"
					sx={{
						strokeDasharray: '187',
						strokeDashoffset: '0',
						transformOrigin: 'center',
						animation: `${dash} 1.4s ease-in-out infinite, ${colors} 5.6s ease-in-out infinite`,
					}}
					fill="none"
					strokeWidth="6"
					strokeLinecap="round"
					cx="33"
					cy="33"
					r="30"
				/>
			</Box>
		</Box>
	);
};

export default LoadingOverlay;
