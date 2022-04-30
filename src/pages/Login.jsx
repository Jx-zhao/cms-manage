import React from "react";
import "./login.min.css"
import logoImg from "../assets/logo.png"
import { Form, Input, Button ,message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link,useNavigate} from "react-router-dom";
import { LoginApi } from "../request/api";

export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    LoginApi({
      username:values.username,
      password:values.password
    }).then(res=>{
      if(res.errCode === 0){
        message.success(res.message)
        // 存储数据
        localStorage.setItem('avatar',res.data.avatar);//头像
        localStorage.setItem('cms-token',res.data['cms-token']);// token
        localStorage.setItem('username',res.data.username);//用户名
        localStorage.setItem('player',res.data.player) // 角色
        localStorage.setItem('editable',res.data.editable)//编辑权限 1/0
        //跳转根路径
        setTimeout(()=>navigate('/'),1000)
      }else{
        message.error(res.message)
      }
      console.log(res);
    })
  };
  return (
    <div className="login">
      <div className="login_box">
      <img src={logoImg} alt="" />
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "请输入账号!",
              },
            ]}
          >
            <Input size="large" placeholder="请输入账号" prefix={<UserOutlined/>} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input.Password size="large" prefix={<LockOutlined/>} placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
          <Link to="/register">还没账号?立即注册</Link>
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" block htmlType="submit">
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
