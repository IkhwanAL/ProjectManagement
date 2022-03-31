import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "../redux/user/userSlice";
import storage from "redux-persist/lib/storage";
import { UserApi } from "../redux/user/UserApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const UserPersistConfig = {
	key: "user",
	storage: storage,
	version: 1,
};

const rootReducer = combineReducers({
	// user: persistReducer({ ...UserPersistConfig }, userReducer),
	[UserApi.reducerPath]: persistReducer(
		{ ...UserPersistConfig },
		UserApi.reducer
	),
});

export const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware({
			serializableCheck: {
				warnAfter: 128,
			},
		}).concat(logger),
		UserApi.middleware,
	],
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
