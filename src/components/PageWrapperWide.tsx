import React, { ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Container } from '@mui/material';

interface PageWrapperWideProps {
	children: ReactNode;
	fullWidth: boolean;
}

const PageWrapperWide: React.FC<PageWrapperWideProps> = ({
	children,
	fullWidth,
}) => {
	return (
		<Container maxWidth="xl" style={{ margin: 0, padding: 0 }}>
			<Header />
			<div style={{ margin: 0, padding: 0 }}>{children}</div>
			<Footer />
		</Container>
	);
};

export default PageWrapperWide;
