import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['BMJUA', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				'jooa': ['BMJUA', 'sans-serif'],
				'RiaSans': ['RiaSans', 'sans-serif'],
				'GongGot': ['GongGothic', 'sans-serif'],
				'jalnan': ['jalnan', 'sans-serif'],
			},
		},
	},
	plugins: [],
}

export default config