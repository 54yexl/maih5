import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import { resolve } from 'path'

// https://vitejs.dev/config/
function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}
export default () => {
  return {
    base: '/',
    esbuild: {},
    resolve: {
      alias: [
        {
          find: '@',
          replacement: pathResolve('src') + '/'
        }
      ]
    },
    server: {
      host:'192.168.10.38',
      hotReload: false,
      port: 2389,
      proxy: {
        '/custom-api': {
          target: 'http://39.103.152.66:8080',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/custom-api/, '')
        }
      }
    },
    // proxy: {

    // },
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: name => `vant/es/${name}/style`
          }
        ]
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {},
          javascriptEnabled: true
        }
      }
    },
    optimizeDeps: {
      include: ['vant', '@vant/touch-emulator']
    }
  }
}
