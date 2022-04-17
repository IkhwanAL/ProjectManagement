module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*/{ts,tsx}"],
	theme: {
		borderWidth: {
			1: "1px",
		},
		extend: {
			height: {
				0: "0",
				128: "32rem",
				150: "40rem",
				256: "64rem",
				100: "100%",
			},
			width: {
				0: "0",
			},
			zIndex: {
				100: "100",
			},
			colors: {
				transparent: "transparent",
				current: "currentColor",
				primary: "#6730ec",
				secondary: "#a9d2ff",
				secondary2: "#a6d7fb",
				secondaryLightColor: "#d7edfd",
				secondaryThinColor: "##dcefff",
				white: "#FFF",
				blackCustom: "#222",
				text: "#333",
				error: "#ff3333",
			},
			boxShadowColor: {
				econdaryThinColor: "##dcefff",
			},
		},
	},
	// mode: "JIT",
	plugins: [],
};
