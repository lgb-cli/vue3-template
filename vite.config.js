import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	base: '/',
	server: {
		proxy: {
			'/api': {
				target: 'http://39.102.213.94:3000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '\/api/')
			},
			'/request/img': {
				target: 'http://39.102.213.94:3000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/uploads/, '')
			}
		}
	},
})