import React,{useState,useEffect} from "react";
import "./scss/login.min.css";
import logoImg from "../assets/logo.png";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { RegisterApi,LoginApi } from "../request/api";

export default function Register() {
  const navigate = useNavigate();
  const [userName,setUsername] = useState('');
  const [validateStatus,setValidateStatus] = useState('')
  const [helpStatus,setHelpstatus] = useState('');
  useEffect(()=>{
    if(userName){
      LoginApi({username:userName,password:"12346"})
      .then(res=>{
        if(res.errCode === 1 && res.message === "该账号不存在"){
            setValidateStatus("success");
            setHelpstatus("")
        }else{
          setValidateStatus('error')
          setHelpstatus("账号已存在")
          console.log(res);
        }
        
        
      })
    }

    // console.log(userName);
  },[userName])
  const onFinish = (values) => {

    RegisterApi({
      username: values.username,
      password: values.password,
    }).then((res) => {
      if (res.errCode === 0) {
        message
          .loading("正在加载请稍等...", 1.5)
          .then(() => message.success(res.message + ",即将跳转至登录页", 1.5))
          .then(() => navigate("/login"), 1.5);
        // 跳转到登录页
      } else {
        message.error(res.message);
      }
    });
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
            hasFeedback
            validateStatus={validateStatus}
            help={helpStatus}
            rules={[
              {
                required: true,
                message: "请输入账号!",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="请输入账号"
              prefix={<UserOutlined />}
              onBlur={e=>setUsername(e.target.value.replaceAll(' ',''))}
            />
          </Form.Item>

          <Form.Item
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
              {
                type:'string',
                min:6,
                message:"密码不得少于6位"
              },
              {
                message:"啊啊啊中"
              }
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "请确认密码!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error("您输入的两个密码不匹配!"));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="请输入确定密码"
            />
          </Form.Item>
          <Form.Item>
            <Link to="/login">已有账号?立即登陆</Link>
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" block htmlType="submit">
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
