import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	AuthState,
	User,
	UserCredentials,
	UserRegister,
} from '../../models/authModels';
import authService from '../../services/authService';
import axios, { AxiosError } from 'axios';
import tokenService from '../../services/tokenService';
import { RootState } from '../store';

const user: User = tokenService.getUser();
const initialState: AuthState = user.token
	? {
			isLoggedIn: true,
			user: user,
			error: '',
			loading: false,
	  }
	: {
			isLoggedIn: false,
			user: { token: '', refreshToken: '' },
			error: '',
			loading: false,
	  };

export const signupAsync = createAsyncThunk<AuthState, UserRegister>(
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
			if (axios.isAxiosError(error)) {
				if (error.response && error.response.status === 502) {
					thunkApi.dispatch(
						setError(
							'Email is already in use. Please choose another one.'
						)
					);
					return thunkApi.rejectWithValue(
						'Email is already in use. Please choose another one.'
					);
				}
				thunkApi.dispatch(
					setError(
						error.response?.data.message ||
							'Email is already in use. Please choose another one.'
					)
				);
				return thunkApi.rejectWithValue(error.response?.data.message);
			}
			thunkApi.dispatch(setError(error.message));
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

export const signinAsync = createAsyncThunk<AuthState, UserCredentials>(
	'auth/login',
	async (userCredentials: UserCredentials, thunkApi) => {
		try {
			const response = await authService.signin(
				userCredentials.email,
				userCredentials.password
			);
			if (response.token) {
				return response;
			}
		} catch (_error) {
			const error = _error as Error | AxiosError;
			if (axios.isAxiosError(error)) {
				if (error.response && error.response.status === 401) {
					thunkApi.dispatch(
						setError('Invalid email or password. Please try again.')
					);
					return thunkApi.rejectWithValue(
						'Invalid email or password. Please try again.'
					);
				}
				thunkApi.dispatch(
					setError(
						error.response?.data.message || 'An error occurred.'
					)
				);
				return thunkApi.rejectWithValue(error.response?.data.message);
			}
			thunkApi.dispatch(setError(error.message));
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

export const signout = createAsyncThunk('auth/signout', async () => {
	authService.removeLocalUser();
});

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
	extraReducers: (builder) => {
		builder
			.addCase(signinAsync.pending, (state) => {
				state.loading = true;
			})
			.addCase(signinAsync.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.isLoggedIn = true;
				state.user = payload.user;
				state.error = '';
			})
			.addCase(signinAsync.rejected, (state) => {
				state.loading = false;
				state.isLoggedIn = false;
			})
			.addCase(signupAsync.pending, (state) => {
				state.loading = true;
			})
			.addCase(signupAsync.fulfilled, (state) => {
				state.loading = false;
				state.error = '';
			})
			.addCase(signupAsync.rejected, (state) => {
				state.loading = false;
				state.isLoggedIn = false;
			})
			.addCase(signout.pending, (state) => {
				state.loading = true;
			})
			.addCase(signout.fulfilled, (state) => {
				state.loading = false;
				state.isLoggedIn = false;
				state.user = { token: '', refreshToken: '' };
				state.error = '';
			});
	},
});

export const { setError, refreshToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
