import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy: { 
      '/api': {
        target: 'http://47.93.114.103:6688/manage', // 后台服务地址以及端口号
        changeOrigin: true, //是否跨域
        rewrite:(path) =>path.replace(/^\/api/, "")
      }
    }
  }
})