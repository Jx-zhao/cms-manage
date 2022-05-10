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
##### 模式和环境变量
使用模式做多环境配置，vite serve时模式默认是development，vite build时是production。
创建配置文件.env.development

```
VITE_TOKEN=this is token
```
代码中读取
```import.meta.env.VITE_TOKEN```

