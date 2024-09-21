import { extendTheme } from '@chakra-ui/react';
import { dividerTheme } from './divider.ts';
import { buttonTheme } from './button.ts';

const theme = extendTheme({
	components: {
		Text: {
			baseStyle: () => ({
				color: 'white'
			})
		},
		Button: buttonTheme,
		Divider: dividerTheme
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
			gray: '#A7A9AC',
			black: '#080808'
		}
	}
});

export default theme;