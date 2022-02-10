import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DataUser } from "../../Props/User.property";
import { getUserApi } from "./userApi";

export enum StatusFetchUser {
	IDLE = "idle",
	LOADING = "loading",
	FAILED = "failed",
}

export interface UserState {
	value: DataUser;
	status:
		| StatusFetchUser.IDLE
		| StatusFetchUser.LOADING
		| StatusFetchUser.FAILED;
}

const initialState: UserState = {
	value: {
		id: "",
		email: "",
		firstName: "",
		lastname: "",
		username: "",
		phoneNumber: "",
	},
	status: StatusFetchUser.IDLE,
};

export const getUserAsync = createAsyncThunk(
	"user/fetchUser",
	async (user: string) => {
		const data = await getUserApi(user);
		return data.data;
	}
);

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<DataUser>) => {
			state.value = action.payload;
		},
		resetUser: (state) => {
			state.value = {
				id: "",
				email: "",
				firstName: "",
				lastname: "",
				username: "",
				phoneNumber: "",
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserAsync.pending, (state) => {
				state.status = StatusFetchUser.LOADING;
			})
			.addCase(getUserAsync.fulfilled, (state, action) => {
				if (!action.payload) {
					state.status = StatusFetchUser.FAILED;
				} else {
					state.status = StatusFetchUser.IDLE;
					state.value = action.payload;
				}
			})
			.addCase(getUserAsync.rejected, (state) => {
				state.status = StatusFetchUser.FAILED;
			});
	},
});

export const { resetUser, setUser } = userSlice.actions;

export const userSelector = (state: RootState) => state.user.value;

export const statusUser = (state: RootState) => state.user.status;

export default userSlice.reducer;
