import { createSlice } from "@reduxjs/toolkit";
import { IProyek } from "../../interface/proyek.interface";
import { RootState } from "../../app/store";

const InitialState: IProyek = {
	values: {
		id: undefined,
	},
};

export const ProyekSlice = createSlice({
	name: "Proyek",
	initialState: InitialState,
	reducers: {
		SetIdProyek: (state, action) => {
			state.values.id = action.payload;
		},
		ResetIdProyek: (state) => {
			state.values.id = undefined;
		},
	},
});

export const { SetIdProyek, ResetIdProyek } = ProyekSlice.actions;

export default ProyekSlice.reducer;

export const proyekSelector = (state: RootState) => state.Proyek.values.id;
