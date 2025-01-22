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
import { RouteContent } from '../models/Interfaces';
import { UserProvider } from '../context/UserContext';

export const routes: RouteContent[] = [
	{ path: '/', element: <Home /> },
	{ path: '/randomizer', element: <Randomizer /> },
	{ path: '/airing', element: <Airing /> },
	{ path: '/terms', element: <TermsOfService /> },
	{ path: '/policy', element: <PrivacyPolicy /> },
	{ path: '/about', element: <AboutKito /> },

	// { path: '/randomizer-search', element: <RandomizerSearch /> },
	// { path: '/popular', element: <Popularity /> },

	{
		path: '/randomizer-search',
		element: (
			<UserProvider>
				<RandomizerSearch />
			</UserProvider>
		),
	},

	{
		path: '/popular',
		element: (
			<UserProvider>
				<Popularity />
			</UserProvider>
		),
	},

	{
		path: '/anime/:id',
		element: (
			<UserProvider>
				<AnimeDetails />
			</UserProvider>
		),
	},

	{
		path: '/settings',
		element: (
			<PrivateRoute>
				<UserProvider>
					<Settings />
				</UserProvider>
			</PrivateRoute>
		),
	},
	{
		path: '/profile',
		element: (
			<PrivateRoute>
				<UserProvider>
					<Profile />
				</UserProvider>
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
