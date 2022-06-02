import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { AuthApi } from "../redux/auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userReducer from "../redux/user/userSlice";
import proyekReducer from "../redux/project/projectSlice";
import proyekActivitiesReducer from "../redux/projectActivity/projectActivitySlice";
import { UserApi } from "../redux/user/userApi";
import { ProjectApi } from "../redux/project/projectApi";
import { ProjectActApi } from "../redux/projectActivity/projectActivityApi";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const PersistUser = {
	key: "UsersPersist",
	storage,
};

const rootReducer = combineReducers({
	User: userReducer,
	Proyek: proyekReducer,
	ProyekActivities: proyekActivitiesReducer,
	[AuthApi.reducerPath]: AuthApi.reducer,
	[UserApi.reducerPath]: UserApi.reducer,
	[ProjectApi.reducerPath]: ProjectApi.reducer,
	[ProjectActApi.reducerPath]: ProjectActApi.reducer,
});

const PersistConfig = {
	key: "root",
	storage,
	whitelist: [],
	blacklist: [
		AuthApi.reducerPath,
		UserApi.reducerPath,
		ProjectApi.reducerPath,
		ProjectActApi.reducerPath,
	],
};

const PersistReducer = persistReducer(
	{ ...PersistConfig, version: 1 },
	rootReducer
);

export const store = configureStore({
	reducer: PersistReducer,
	middleware: (getDefaultMiddelware) =>
		getDefaultMiddelware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
				warnAfter: 128,
			},
		})
			.concat(AuthApi.middleware)
			.concat(UserApi.middleware)
			.concat(ProjectApi.middleware)
			.concat(ProjectActApi.middleware),
	devTools: true,
});

setupListeners(store.dispatch);

// export type PersistorType = typeof persistor;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
