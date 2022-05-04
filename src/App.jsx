import React,{useState} from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Footer from "./components/Footer"
import Header from "./components/Header"
import Aside from "./components/Aside";
import Breadcrumbs from "./components/Breadcrumbs"

function App() {
  const { Content } = Layout;
  const [linkUrl,setLinkurl] = useState("查看文章列表")
  const navclick = (v)=>{
    setLinkurl(v)
  }
  return (
    <Layout className="app">
      <Header />
      <Layout className="layout-Content">
      <Aside navSwitch={navclick}/>
        <Layout
          style={{
            padding: "0 20px 20px",
            flex:1,
            
          }}
        >
        <Breadcrumbs link={linkUrl}/>
          <Content
            className="content-background"
            style={{
              padding:'0 20px 20px',
              margin: 0,
              minHeight: 280,
              position: 'relative',
            }}
          >
            {!linkUrl&& <h1>你好, 欢迎回家!!!</h1>}
              <Outlet />
          </Content>
        </Layout>
      </Layout>
      <Footer />
    </Layout>
  );
}
export default App;
