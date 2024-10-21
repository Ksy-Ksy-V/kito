import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	currentUser: undefined,
	isLoading: false,
};

export const signup = createAsyncThunk(
	'auth/signup',
	async (userData, thunkAPI) => {
		try {
			const response = await axios.post('http://localhost:8080', {
				user: userData,
			});
			return response.data.user;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.errors);
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
			.addCase(signup.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload;
			})
			.addCase(signup.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export default authSlice.reducer;
