import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	build: {
		sourcemap: true,
		outDir: 'dist',
		lib: {
			entry: path.resolve(__dirname, 'src/index.js'),
			formats: ['es']
		}
	}
});
