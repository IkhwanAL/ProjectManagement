import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { persistStore } from "redux-persist";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#6730ec",
			light: "#9c74f3",
			dark: "#4821a5",
			"900": "#0007cf",
		},
		secondary: {
			main: "#a9d3ff",
			light: "#c9e3ff",
			dark: "#77b2ff",
			"900": "#4c53a9",
		},
		error: {
			main: "#ff200c",
		},
		info: {
			main: "#3056ec",
		},
		warning: {
			main: "#ec6830",
		},
	},
});

const Persistor = persistStore(store);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<PersistGate persistor={Persistor} loading={null}>
				<React.StrictMode>
					<ThemeProvider theme={theme}>
						{/* <DndProvider backend={HTML5Backend}> */}
						<App />
						{/* </DndProvider> */}
					</ThemeProvider>
				</React.StrictMode>
			</PersistGate>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
