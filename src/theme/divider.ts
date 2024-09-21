import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const green = defineStyle({
	opacity: 0.5,
	borderWidth: '0.25px',
	borderStyle: 'solid',
	borderColor: 'sig.green'
});

const teal = defineStyle({
	opacity: 0.8,
	borderWidth: '0.5px',
	borderStyle: 'solid',
	borderColor: 'sig.teal'
});

export const dividerTheme = defineStyleConfig({
	variants: {
		green,
		teal
	}
});