import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../@types/user.types";
import { RootState } from "../../app/store";

const InitialState: UserType = {
	values: {
		email: "",
		token: "",
	},
};

export const UserSlice = createSlice({
	name: "users",
	initialState: InitialState,
	reducers: {
		SetEmailParams: (state, action) => {
			state.values = { ...state.values, email: action.payload };
		},
		ResetusersParam: (state) => {
			state.values = InitialState.values;
		},
		SetTokenParams: (state, action) => {
			state.values = { ...state.values, token: action.payload };
		},
	},
});

export const { SetEmailParams, ResetusersParam, SetTokenParams } =
	UserSlice.actions;

export default UserSlice.reducer;

export const userSelector = (state: RootState) => state.User.values;
