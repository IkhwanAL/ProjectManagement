import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#6730ec",
			light: "#8559ef",
			dark: "#4821a5",
			contrastText: "#333",
		},
		secondary: {
			main: "#a9d2ff",
			light: "#badbff",
			dark: "#7693b2",
		},
	},
	typography: {
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
	},
	transitions: {
		duration: {
			shortest: 150,
			shorter: 200,
			short: 250,
			// most basic recommended timing
			standard: 300,
			// this is to be used in complex animations
			complex: 375,
			// recommended when something is entering screen
			enteringScreen: 225,
			// recommended when something is leaving screen
			leavingScreen: 195,
		},
		easing: {
			// This is the most common easing curve.
			easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
			// Objects enter the screen at full velocity from off-screen and
			// slowly decelerate to a resting point.
			easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
			// Objects leave the screen at full velocity. They do not decelerate when off-screen.
			easeIn: "cubic-bezier(0.4, 0, 1, 1)",
			// The sharp curve is used by objects that may return to the screen at any time.
			sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
		},
	},
});
