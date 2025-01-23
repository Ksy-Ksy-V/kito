import React from 'react';
import { Grid2 } from '@mui/material';
import LoadingOverlay from './LoadingOverlay';
import {
	formContainerStyles,
	gridContainerStyles,
} from '../../styles/AuthStyles';
import { AuthPageLayoutProps } from '../../models/Interfaces';
import { useAppSelector } from '../../store/hooks';
import { selectAuth } from '../../store/reducers/authSlice';

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children }) => {
	const { loading } = useAppSelector(selectAuth);
	return (
		<>
			{loading && <LoadingOverlay />}
			<Grid2 container spacing={2} size={12} sx={gridContainerStyles}>
				<Grid2
					size={{ xl: 4, lg: 5, md: 6, sm: 8, xs: 12 }}
					offset={{ xl: 8, lg: 7, md: 6, sm: 4, xs: 0 }}
					sx={formContainerStyles}
				>
					{children}
				</Grid2>
			</Grid2>
		</>
	);
};

export default AuthPageLayout;
