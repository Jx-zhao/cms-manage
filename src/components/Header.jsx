import React, {useState,useEffect} from "react";
import logo from "../assets/logo.png";
import { Menu, Dropdown, Space ,message } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import defaultAvatar from "../assets/avatar.png"
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
const [avatar,setAvatar] = useState(defaultAvatar)
const [username,setUsername] = useState("游客")
// 模拟componentDidMount  初始化的时候获取localStorage中的信息
useEffect(() => {
  const userName = localStorage.getItem("username");
  const avatar1 = localStorage.getItem("avatar");
  if(userName){
    setUsername(userName)
  }
  if(avatar1){
    setAvatar("http://47.93.114.103:6688/" + avatar1)
  }
}, [])
//点击退出或修改资料 key == 1 修改资料, key等于2 退出登陆 
const rightClick=({key}) =>{
  if(key === '1'){
    console.log(key);
  }else if(key === '2'){
    //删除localStorage中的 token 并跳转到登录页
    message.success("退出成功正在返回登录页",0.8,()=>{
      localStorage.removeItem("cms-token");
      navigate("/login")
    })
  }
}
const menu = (
  <Menu
  onClick={rightClick}
    items={[
      {
        label: "修改资料",
        key:'1'
      },
      {
        type: "divider",
      },
      {
        danger: true,
        label: "安全退出",
        key:'2'
      },
    ]}
  />
);
  return (
    <header>
      <img src={logo} className="logo" />
      <div className="right">
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {avatar && <img src={avatar} className="avatar" />}

              <span>{username}</span>
              <CaretDownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </header>
  );
}
