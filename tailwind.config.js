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
		},
		keyframes: {
			"fade-in-down": {
				"0%": {
					opacity: "0",
					transform: "translateY(-10px)",
				},
				"100%": {
					opacity: "1",
					transform: "translateY(0px)",
				},
			},
			"fade-in-up": {
				"100%": {
					opacity: "1",
					transform: "translateY(0px)",
				},
				"0%": {
					opacity: "1",
					transform: "translateY(10px)",
				},
			},
			"fade-in-down-deep": {
				"0%": {
					opacity: "1",
					transform: "translateY(0px)",
					display: "block",
					visibility: "visible",
				},
				"100%": {
					opacity: "0",
					transform: "translateY(20px)",
					display: "none",
					visibility: "none",
				},
			},
		},
		animation: {
			"fade-in-down": "fade-in-down 0.5s ease-out",
			"fade-in-up": "fade-in-up 0.5s ease-out",
			"fade-in-down-deep": "fade-in-down-deep 0.5s ease-out",
		},
	},
	plugins: [],
};
