import {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useReducer,
} from 'react';
import {
	Action,
	initialUserState,
	userReducer,
	UserState,
} from './UserReducers';

const UserContext = createContext<{
	state: UserState;
	dispatch: Dispatch<Action>;
} | null>(null);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, initialUserState);

	useEffect(() => {
		dispatch({ type: 'SET_USER', payload: initialUserState.user });
	}, []);

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
};
