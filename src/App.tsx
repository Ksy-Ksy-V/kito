import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';

import './App.css';
import PageWrapper from './components/PageWrapper';
import NotFound from './pages/Error/NotFound';
import { routes, routesWide } from './data/routesContent';
import ScrollToTop from './components/Buttons/ScrollToTop';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<Router>
				<Routes>
					{routes.map(({ path, element }) => (
						<Route
							key={path}
							path={path}
							element={
								<PageWrapper fullWidth={false}>
									{element}
								</PageWrapper>
							}
						/>
					))}

					{routesWide.map(({ path, element }) => (
						<Route
							key={path}
							path={path}
							element={
								<PageWrapper fullWidth>{element}</PageWrapper>
							}
						/>
					))}
					<Route path="*" element={<NotFound />} />
				</Routes>
				<ScrollToTop />
			</Router>
		</ThemeProvider>
	);
}

export default App;
