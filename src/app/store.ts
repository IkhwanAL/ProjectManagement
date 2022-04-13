import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { AuthApi } from "../redux/auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userReducer from "../redux/user/userSlice";
import { UserApi } from "../redux/user/userApi";

const rootReducer = combineReducers({
	User: userReducer,
	[AuthApi.reducerPath]: AuthApi.reducer,
	[UserApi.reducerPath]: UserApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddelware) => [
		...getDefaultMiddelware({
			serializableCheck: {
				warnAfter: 128,
			},
		}),
		AuthApi.middleware,
		UserApi.middleware,
	],
	devTools: true,
});

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
