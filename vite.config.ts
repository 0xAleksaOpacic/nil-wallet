import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				popup: './popup.html',
				onboarding: './onboarding.html',
				background: './src/background/background.ts',
			},
			output: {
				entryFileNames: (chunk) => {
					if (chunk.name === 'background') {
						return '[name].js';
					}
					return 'assets/[name].[hash].js';
				},
			},
		},
	},
});