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
	  }
	: {
			isLoggedIn: false,
			user: { token: '', refreshToken: '' },
			error: '',
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

export const singout = createAsyncThunk('auth/logout', async () => {
	authService.logout();
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
			.addCase(signinAsync.fulfilled, (state, { payload }) => {
				state.isLoggedIn = true;
				state.user = payload.user;
				state.error = '';
			})
			.addCase(signinAsync.rejected, (state) => {
				state.isLoggedIn = false;
			})
			// .addCase(signup.pending, (state) => {
			// 	state.isLoading = true;
			// })
			.addCase(signupAsync.fulfilled, (state) => {
				state.error = '';
			})
			.addCase(signupAsync.rejected, (state) => {
				state.isLoggedIn = false;
			})
			.addCase(singout.fulfilled, (state) => {
				state.isLoggedIn = false;
				state.user = { token: '', refreshToken: '' };
				state.error = '';
			});
	},
});

export const { setError, refreshToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
