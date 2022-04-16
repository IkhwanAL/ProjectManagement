import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { theme } from "./Styles/Theme";
import { store } from "./app/store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<React.StrictMode>
				{/* <ThemeProvider theme={theme}> */}
				<App />
				{/* </ThemeProvider> */}
			</React.StrictMode>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
