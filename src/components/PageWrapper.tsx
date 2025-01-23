import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Container } from '@mui/material';
import { PageWrapperProps } from '../models/Interfaces';
import { FC } from 'react';

const PageWrapper: FC<PageWrapperProps> = ({ children, fullWidth }) => {
	return (
		<>
			<Container maxWidth="lg">
				<Header />
			</Container>
			<Container maxWidth={fullWidth ? 'xl' : 'lg'}>{children}</Container>
			<Container maxWidth="lg">
				<Footer />
			</Container>
		</>
	);
};

export default PageWrapper;
