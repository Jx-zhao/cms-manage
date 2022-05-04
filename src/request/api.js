import request from "./request"

//注册
export const RegisterApi = (params) => request.post('/register',params)

//登陆
export const LoginApi = params => request.post('/login',params);

//获取文章列表
export const ArticleListApi = params => request.get('/article',{params});

//删除文章
export const RemoveArticleApi = params => request.post('/article/remove',params)