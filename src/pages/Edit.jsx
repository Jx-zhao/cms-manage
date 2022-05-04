import React,{useState,useEffect} from 'react'
import { PageHeader,message } from 'antd';
import { useLocation,useNavigate } from 'react-router-dom';
import {ArrowLeftOutlined} from '@ant-design/icons'
import { ArticleAddApi ,ArticleSearchApi,ArticleUpdateApi} from '../request/api'
import Editmodal from '../components/Editmodal'
import E from 'wangeditor'
let editor = null
export default function Edit() {
  let location = useLocation()
  const navigate = useNavigate()
  let myDate = new Date();
  let day = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+(myDate.getDay()+1)
  const [backicon,setBackicon] = useState()
  const [contents,setContents] = useState()
  const [date,setDate] = useState({
    title:"",
    subTitle:'',
    contnet:''
  })

  const dealData = (errCode,msg)=>{
    if(errCode === 0){
      message.success(msg,1.5,()=>navigate('/articlelist'));
      
    }else{
      message.error(msg);
    }
  }
  const onSubmit = (props)=>{
    console.log(location.state);
    if(location.state&&location.state.datas){
      ArticleUpdateApi({
        title:props.title,
        subTitle: props.description,
        content:contents,
        id:location.state.datas
      }).then(res=>dealData(res.errCode,res.message))
    }else{
      ArticleAddApi({
        title:props.title,
        subTitle: props.description,
        content:contents,
      }).then(res=>dealData(res.errCode,res.message))
    }
  }
  useEffect(()=>{
    editor = new E('#wangeditor')
    editor.config.onchange = newHtml =>{
      setContents(newHtml)
    }
    editor.create()
    if(location.state&&location.state.datas){
      setBackicon(true)
      ArticleSearchApi(location.state.datas).then(res=>{
        if(res.errCode === 0){
          setDate({
            title:res.data.title,
            subTitle:res.data.subTitle,
            content:res.data.content
          })
          editor.txt.html(res.data.content)
        }else{
          message.error(res.message);
        }
        
        console.log(res);
      })
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
      extra={<Editmodal name="提交文章" title="填写文章标题" values={date.title} subtitle={date.subTitle} onSubmit={onSubmit}/>}
    />
  </div>
  <div id="wangeditor">
    </div>
    </>
  )
}