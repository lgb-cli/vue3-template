import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	base: '/',
	css: {
		postcss: {
			plugins: [
				autoprefixer()
			]
		}
	},
	preview: {
		port: 9000
	},
	server: {
		port: 8080,
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
			},
			'/files': {
				target: 'http://39.102.213.94:3000',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/files/, '/files')
			}
		}
	},
	build: {
		outDir: 'build',
		sourcemap: false,
		cssCodeSplit: true,
		//输出的静态资源文件名加时间戳
		rollupOptions: {
			output: {
				assetFileNames: 'static/assets/[name]-[hash].[ext]'
			}
		}
	}
})