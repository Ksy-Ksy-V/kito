import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState, User, UserRegister } from '../../models/authModels';
import authService from '../../services/authService';
// import { RootState } from '@reduxjs/toolkit/query';
import axios, { AxiosError } from 'axios';
import tokenService from '../../services/tokenService';

const user: User = tokenService.getUser();
const initialState: AuthState = user.token
	? {
			isLoggedIn: true,
			user: user,
			error: '',
	  }
	: {
			isLoggedIn: false,
			user: { token: '', refreshToken: '' },
			error: '',
	  };

export const signup = createAsyncThunk<AuthState, UserRegister>(
	'auth/signup',
	async (userRegister: UserRegister, thunkApi) => {
		try {
			const response = await authService.signup(
				userRegister.name,
				userRegister.email,
				userRegister.password
			);
			if (response.status === 200) {
				return response;
			}
		} catch (_error) {
			const error = _error as Error | AxiosError;
			console.log(error);
			if (axios.isAxiosError(error)) {
				thunkApi.dispatch(setError(error.response?.data.message));
				return thunkApi.rejectWithValue(error.response?.data.message);
			}
			thunkApi.dispatch(setError(error.message));
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		refreshToken: (state, { payload }) => {
			state.user.token = payload.acessToken;
			state.user.refreshToken = payload.refreshToken;
		},
	},
	extraReducers: (bulder) => {
		bulder
			// .addCase(signup.pending, (state) => {
			// 	state.isLoading = true;
			// })
			.addCase(signup.fulfilled, (state) => {
				state.error = '';
			});
		// .addCase(signup.rejected, (state) => {
		// 	state.isLoading = false;
		// });
	},
});

export const { setError, refreshToken } = authSlice.actions;

// export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
