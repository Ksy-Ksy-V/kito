import React, { ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Container } from '@mui/material';

interface PageWrapperProps {
	children: ReactNode;
	fullWidth: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, fullWidth }) => {
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
