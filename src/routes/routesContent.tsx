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
import PrivateRoute from './PrivateRoute';
import { RouteContent } from '../models/RouteModels';

export const routes: RouteContent[] = [
	{ path: '/', element: <Home /> },
	{ path: '/popular', element: <Popularity /> },
	{ path: '/randomizer', element: <Randomizer /> },
	{ path: '/randomizer-search', element: <RandomizerSearch /> },
	{ path: '/airing', element: <Airing /> },

	{ path: '/anime/:id', element: <AnimeDetails /> },

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
