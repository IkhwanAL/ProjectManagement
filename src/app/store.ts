import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { AuthApi } from "../redux/auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userReducer from "../redux/user/userSlice";
import proyekReducer from "../redux/project/projectSlice";
import { UserApi } from "../redux/user/userApi";
import { ProjectApi } from "../redux/project/projectApi";

const rootReducer = combineReducers({
	User: userReducer,
	Proyek: proyekReducer,
	[AuthApi.reducerPath]: AuthApi.reducer,
	[UserApi.reducerPath]: UserApi.reducer,
	[ProjectApi.reducerPath]: ProjectApi.reducer,
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
		ProjectApi.middleware,
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
