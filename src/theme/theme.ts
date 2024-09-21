import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	components: {
	},
	styles: {
	},
	fonts: {
		body: 'DM Sans, sans-serif'
	},
	colors: {
		wallet: {
			darkBlue: '#2759a0',
			lightBlue: '#0AB7F5',
			lightGray: '#e5e5e5',
			black: '#080808'
		},
		gray: {
			100: '#e5e5e5',
			200: '#d4d4d4',
			300: '#bcbcbc',
		},
		blue:{
			100: '#2759a0',
			200: '#234f8e',
			300: '#1f457c',
		}
	}
});

export default theme;