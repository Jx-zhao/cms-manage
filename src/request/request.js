import axios from "axios";

const axiosOption = {
  baseURL:'/api',
  timeout:5000
}

//创建一个单例
const instance = axios.create(axiosOption);
// 添加一个请求拦截器
instance.interceptors.request.use(function(config){
  let token = localStorage.getItem('cms-token');
  if(token){
    config.headers = {
      "cms-token":token
    }
  }
  return config;
},function(error){
  // 对请求错误做些什么
  return Promise.reject(error);
});
//添加响应拦截器
instance.interceptors.response.use(function(response){
  //添加响应拦截器
  return response.data
},function(error){
  //对响应错误做点什么
  return Promise.reject(error);
});
export default instance;