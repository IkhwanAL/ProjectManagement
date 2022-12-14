module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*/{ts,tsx}"],
	theme: {
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
				primaryWhite: "#FFF",
				secondaryPurple: "#6730ec",
				secondaryBlueLight: "#a9d2ff",
				secondary2BlueLight: "#a6d7fb",
				secondaryLightColor: "#d7edfd",
				secondaryThinColor: "##dcefff",
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
