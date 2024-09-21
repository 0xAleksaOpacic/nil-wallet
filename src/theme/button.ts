import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const filled = defineStyle({
	backgroundColor: 'wallet.orange',
	color: 'wallet.black',
	fontWeight: 700,
	borderRadius: 45,
	padding: '22px 24px',
	borderWidth: '1px',
	borderStyle: 'solid',
	borderColor: 'wallet.orange',
	transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
	_hover: {
		background: 'transparent',
		color: 'wallet.orange',
		boxShadow: '0px 0px 10px 2px rgba(229,118,85,255)'
	},
	_disabled: {
		_hover: {
			backgroundColor: 'wallet.orange',
			background: 'wallet.orange !important',
			color: 'wallet.black',
			boxShadow: 'none'
		}
	}
});

const hollow = defineStyle({
	backgroundColor: 'transparent',
	borderWidth: '1px',
	borderStyle: 'solid',
	borderColor: 'wallet.teal',
	color: 'wallet.teal',
	fontWeight: 500,
	borderRadius: 45,
	padding: '22px 24px',
	transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
	_hover: {
		backgroundColor: 'wallet.teal',
		color: 'wallet.black',
		boxShadow: '0px 0px 10px 2px rgba(120,198,194,255)'
	},
	_disabled: {
		_hover: {
			color: 'wallet.teal',
			boxShadow: 'none'
		}
	}
});

export const buttonTheme = defineStyleConfig({
	variants: {
		filled,
		hollow
	}
});