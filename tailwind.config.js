/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.tsx",
		"./public/*.html",
	],
	theme: {
		extend: {
			backgroundImage: {
				"cyber": "url('../images/cyber.png')",
				"button": "url('../images/button.png')",
			},
			colors: {
				"primary": "#A6DDFC"
			},
		},
	},
	plugins: [],
}
