import React, { ReactNode } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface PageWrapperProps {
	children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default PageWrapper;
