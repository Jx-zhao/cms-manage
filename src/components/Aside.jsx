import React,{useState,useEffect} from 'react'
import { Menu,Layout } from 'antd';
import { EditOutlined, BarsOutlined, SettingOutlined } from '@ant-design/icons';
import {useNavigate,useLocation} from "react-router-dom"
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('查看文章列表', 'articlelist', <BarsOutlined />),
  getItem('文章编辑', 'edit', <EditOutlined />,),
  getItem('修改资料', 'means', <SettingOutlined />,),
];
const Aside = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultKey,setDefaultKey] = useState('');
  useEffect(()=>{
    let path = location.pathname
    let key = path.split('/')[1];
    setDefaultKey(key)
    const navKey = items.filter(item=>item.key === key)
    navKey.length?props.navSwitch(navKey[0].label):props.navSwitch("")
  })
  const onClick = (e) => {
    props.navSwitch(e.domEvent.target.innerText)
    navigate("/"+e.key)
    setDefaultKey(e.key)
  };
  return (
    <Layout className="ant-layout-aside">
    <Menu
      onClick={onClick}
      style={{
        width: 160,
      }}
      selectedKeys={[defaultKey]}
      mode="inline"
      theme="dark"
      items={items}
    />
    </Layout>
  );
};

export default Aside;
