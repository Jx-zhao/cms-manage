# cms-manage

### 安装依赖 并运行
```
$ npm install
$ npm run dev
```

##### vite 配置服务器代理，vite.config.js
```
export default {
  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}
```
##### 数据mock
###### 安装依赖
```
npm i mockjs -S
npm i vite-plugin-mock cross-env -D
```
###### 引入插件，vite.config.js
```
plugins: [
  createMockServer({
    // close support .ts file
    supportTs: false,
  }),
],
```
###### 设置环境变量，package.json
```
"dev": "cross-env NODE_ENV=development vite"
```
##### 创建mock文件，mock/test.js
```
export default [
  {
    url: "/api/users",
    method: "get",
    response: req => {
      return {
        code: 0,
        data: [
          {
            name: "tom",
          },
          {
            name: "jerry",
          },
        ],
      };
    },
  },
  {
    url: "/api/post",
    method: "post",
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: "vben",
      },
    },
  },
];
```
