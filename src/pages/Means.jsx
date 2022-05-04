import React,{useState,useEffect} from "react";
import { Form, Input, Button ,message } from "antd";
import {GetUsetDataApi,ChangeUserApi} from '../request/api'
import "./scss/means.min.css"
import UploadAvatar from '../components/UploadAvatar'

export default function Means() {
  const [userData,setUserData] = useState({});
  useEffect(()=>{
    GetUsetDataApi().then(res=>{
      console.log(res);
      if(res.errCode === 0){
        message.success(res.message)
        //存到sessionStorage
        sessionStorage.setItem('username',res.data.username)
      }else{
        message.error(res.message)
      }
    });
  },[])
  const onFinish = (values) => {
    console.log("Success:", values);
    //如果表单的username有值,并且不等于初始化时拿到的username
    if(values.username && values.username!==sessionStorage.getItem('username')&&values.password.trim() !== ""){
      //提交修改
      ChangeUserApi({
        username:values.username,
        password:values.password
      }).then(res=>{
        console.log(res);
      if(res.errCode === 0){
        message.success(res.message)
      }else{
        message.error(res.message)
      }
      })
    }
  };
  return (
    <div className="means-form">
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        initialValues={{
          remember: true,
          username:userData?.username,
          password:userData?.password
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="修改用户名"
          name="username"
          rules={[
            {
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="请输入新用户名"/>
        </Form.Item>
        <Form.Item
          label="修 改 密 码"
          name="password"
          rules={[
            {
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="请输入新密码"/>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 20,
            span: 4,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      <p>点击下方修改头像:</p>
      <UploadAvatar/>
    </div>
  );
}
