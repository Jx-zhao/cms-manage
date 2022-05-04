import React,{useState,useEffect} from 'react'
import { PageHeader } from 'antd';
import { useLocation } from 'react-router-dom';
import {ArrowLeftOutlined} from '@ant-design/icons'
import Editmodal from '../components/Editmodal'
import E from 'wangeditor'
let editor = null
export default function Edit() {
  let location = useLocation()
  let myDate = new Date();
  let day = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+(myDate.getDay()+1)
  const [backicon,setBackicon] = useState()
  const [content,setContent] = useState()
  const onSubmit = (props)=>{
    console.log("点击了提交",content,props);
  }
  useEffect(()=>{
    editor = new E('#wangeditor')
    editor.config.onchange = newHtml =>{
      setContent(newHtml)
    }
    editor.create()

    if(location.state&&location.state.datas){
      setBackicon(true)
    }else{
      setBackicon(false)
    }
    return ()=>{
      editor.destroy()
    }
  },[])
  return (
    <>
    <div className="site-page-header-ghost-wrapper">
    <PageHeader
      ghost={false}
      backIcon={backicon&&<ArrowLeftOutlined />}
      onBack={() => window.history.back()}
      title="文章编辑"
      subTitle={'当前日期:'+day}
      extra={<Editmodal name="提交文章" title="填写文章标题" values="123" subtitle="4444" onSubmit={onSubmit}/>}
    />
  </div>
  <div id="wangeditor">
    </div>
    </>
  )
}