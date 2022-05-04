import React,{useState,useEffect} from 'react'
import { ArticleListApi,ArticleDelApi } from '../request/api'
import { List, message, Button, Skeleton,Pagination  } from 'antd';
import { useNavigate } from 'react-router-dom';
import Moment from "moment"
import "./scss/list.min.css"

export default function ArticleList() {
  let navigate = useNavigate()
  const [list,setList] = useState([])
  const [datas,setDatas] = useState([])
  const [num,setnum] = useState(1)
  const [total,setTotal] = useState()
  let PageSize = 9;
  //请求文章列表
  const ArticleListfn = ()=>{
    ArticleListApi({num:num,count:PageSize}).then(res=>{
    if(res.errCode === 0){
      setList(res.data.arr)
      setDatas(res.data.arr)
      setTotal(res.data.total)
      console.log(res.data);
    }
  })
}
const onPaginationChange = (e) =>{
  setnum(e)
}
const handleClick = (id,key) =>{
  if(key === 'edit'){
    navigate('/edit/'+id,{state:{datas:id}})
  }else if(key === 'del'){
    ArticleDelApi({id}).then(res=>{
      if(res.errCode === 0){
        message.success(res.message)
        ArticleListfn();
      }else{
        message.error(res.massar);
      }
    })
  }
  console.log(id);
}
  useEffect(()=>{
    ArticleListfn();
  },[num])
  return (
    <>
    <List
    className="demo-loadmore-list"
    itemLayout="horizontal"
    dataSource={list}
    style={{overflow:'auto',maxHeight:"95%"}}
    renderItem={item => (
      <List.Item
        actions={[
          <Button type="primary" onClick={()=>handleClick(item.id,'edit')}>编辑</Button>, 
          <Button type="primary" danger onClick={()=>handleClick(item.id,'del')}>删除</Button>]}
      >
        <Skeleton avatar title={false} loading={item.loading} active>
          <List.Item.Meta
            title={<a href={"http://codesohigh.com:8888/article/"+item.id} target="_blank">{item.title}</a>}
            description={item.subTitle}
          />
          <div>{Moment(item.date).format("YYYY-MM-DD hh:mm:ss")}</div>
        </Skeleton>
      </List.Item>
    )}
  />
  <Pagination className="lists-pagination" defaultCurrent={num} defaultPageSize={PageSize} total={total} onChange={e =>onPaginationChange(e)}/>
  </>
  )
}