import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DataUser } from "../../Props/User.property";

export enum StatusFetchUser {
	IDLE = "idle",
	LOADING = "loading",
	FAILED = "failed",
	SUCCESS = "success",
}

export interface UserState {
	value: DataUser;
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
};

export const userSlice = createSlice({
	name: "userTeam",
	initialState,
	reducers: {
		SetTeam: (state, action: PayloadAction<DataUser>) => {
			state.value = action.payload;
		},
		ResetTeam: (state) => {
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
});

export const { SetTeam, ResetTeam } = userSlice.actions;

export const userSelector = (state: RootState) => state.user.value;

export default userSlice.reducer;
