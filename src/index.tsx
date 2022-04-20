import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./app/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

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

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<React.StrictMode>
				<ThemeProvider theme={theme}>
					<DndProvider backend={HTML5Backend}>
						<App />
					</DndProvider>
				</ThemeProvider>
			</React.StrictMode>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
