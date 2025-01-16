import { createContext, useContext, useReducer } from 'react';
import {
	Action,
	initialUserState,
	userReducer,
	UserState,
} from './UserReducers';

const UserContext = createContext<{
	state: UserState;
	dispatch: React.Dispatch<Action>;
} | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(userReducer, initialUserState);

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
