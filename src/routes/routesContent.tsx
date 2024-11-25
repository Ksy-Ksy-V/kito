import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import Popularity from '../pages/Popularity/Popularity';
import Airing from '../pages/Airing/Airing';
import Randomizer from '../pages/Randomizer/Randomizer';
import RandomizerSearch from '../pages/Randomizer/RandomizerSearch';

import Settings from '../pages/Settings/Settings';
import { SearchProvider } from '../context/SearchContext';
import AnimeDetails from '../pages/AnimeDetails/AnimeDetails';
import Profile from '../pages/Account/Profile';
import TermsOfService from '../pages/legal/TermsOfService';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';
import AboutKito from '../pages/legal/AboutKito';
import PrivateRoute from './PrivateRoute';

interface RouteContent {
	path: string;
	element: JSX.Element;
}

export const routes: RouteContent[] = [
	{ path: '/', element: <Home /> },
	{ path: '/popular', element: <Popularity /> },
	{ path: '/randomizer', element: <Randomizer /> },
	{ path: '/randomizer-search', element: <RandomizerSearch /> },
	{ path: '/airing', element: <Airing /> },

	{ path: '/anime/:id', element: <AnimeDetails /> },
	{ path: '/profile', element: <Profile /> },

	{ path: '/terms', element: <TermsOfService /> },
	{ path: '/policy', element: <PrivacyPolicy /> },
	{ path: '/about', element: <AboutKito /> },

	{
		path: '/settings',
		element: (
			<PrivateRoute>
				<Settings />
			</PrivateRoute>
		),
	},
	{
		path: '/profile',
		element: (
			<PrivateRoute>
				<Profile />
			</PrivateRoute>
		),
	},
];

export const routesWide: RouteContent[] = [
	{
		path: '/search',
		element: (
			<SearchProvider>
				<Search />
			</SearchProvider>
		),
	},
];
