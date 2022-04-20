import { createSlice } from "@reduxjs/toolkit";
import { IProyek, IProyekActivities } from "../../interface/proyek.interface";
import { RootState } from "../../app/store";

const InitialState: IProyekActivities = {
	values: {
		id: undefined,
	},
};

export const ProyekActivitiesSlice = createSlice({
	name: "ProyekActivities",
	initialState: InitialState,
	reducers: {
		SetIdProyekActivities: (state, action) => {
			state.values.id = action.payload;
		},
		ResetIdProyekActivities: (state) => {
			state.values.id = undefined;
		},
	},
});

export const { SetIdProyekActivities, ResetIdProyekActivities } =
	ProyekActivitiesSlice.actions;

export default ProyekActivitiesSlice.reducer;

export const proyekSelector = (state: RootState) => state.Proyek.values;
