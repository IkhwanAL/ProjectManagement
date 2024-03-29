import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../interface/user.interface";
import { RootState } from "../../app/store";

const InitialState: IUser = {
	values: {
		id: "",
		email: "",
		token: "",
		isLogin: false,
		user: "",
	},
};

export const UserSlice = createSlice({
	name: "users",
	initialState: InitialState,
	reducers: {
		SetEmailParams: (state, action) => {
			state.values.email = action.payload;
		},
		SetTokenParams: (state, action) => {
			state.values.token = action.payload;
		},
		SetLogin: (state, action) => {
			state.values.isLogin = action.payload;
		},
		ResetUser: (state) => {
			state.values = InitialState.values;
		},
		SetIdUser: (state, action) => {
			state.values.id = action.payload;
		},
		ResetIdUser: (state, action) => {
			state.values.id = InitialState.values.id;
		},
		SetUsername: (state, action) => {
			state.values.user = action.payload;
		},
		ResetUsername: (state, action) => {
			state.values.user = InitialState.values.user;
		},
	},
});

export const {
	SetEmailParams,
	SetTokenParams,
	ResetUser,
	SetIdUser,
	SetLogin,
	SetUsername,
	ResetUsername,
} = UserSlice.actions;

export default UserSlice.reducer;

export const userSelector = (state: RootState) => state.User.values;
