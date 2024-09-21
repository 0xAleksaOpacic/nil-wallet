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
		global: () => ({
			body: {
				color: 'white',
				background: '#080808'
			}
		})
	},
	fonts: {
		body: 'DM Sans, sans-serif'
	},
	colors: {
		wallet: {
			orange: '#EF5909',
			teal: '#78CDD1',
			green: '#048C80',
			gray: '#A7A9AC',
			black: '#080808'
		}
	}
});

export default theme;