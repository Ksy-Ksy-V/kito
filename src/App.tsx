import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';

import './App.css';
import PageWrapper from './components/PageWrapper';
import NotFound from './pages/Error/NotFound';
import OpenOnTop from './utils/OpenOnTop';
import ScrollToTop from './components/Buttons/ScrollToTop';
import { routes, routesWide } from './routes/routesContent';
import SignUp from './pages/authentication/SignUp';
import SignIn from './pages/authentication/SignIn';
import CustomSelection from './utils/CustomSelection';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<Router
				future={{
					v7_relativeSplatPath: true,
					v7_startTransition: true,
				}}
			>
				<CustomSelection />
				<OpenOnTop />
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

					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
				</Routes>
				<ScrollToTop />
			</Router>
		</ThemeProvider>
	);
}

export default App;
