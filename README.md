# cms-manage

//vite 配置服务器代理，vite.config.js
export default {
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}

数据mock
安装依赖
```
npm i mockjs -S
npm i vite-plugin-mock cross-env -D
```
引入插件，vite.config.js
plugins: [
  createMockServer({
    // close support .ts file
    supportTs: false,
  }),
],
