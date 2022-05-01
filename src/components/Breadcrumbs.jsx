import React from 'react'
import { Breadcrumb } from "antd";
export default function Breadcrumbs(props) {
  return (
    <Breadcrumb
    style={{
      margin: "16px 0",
    }}
  >
    <Breadcrumb.Item>首页</Breadcrumb.Item>
    <Breadcrumb.Item>{props.link}</Breadcrumb.Item>
  </Breadcrumb>
  )
}
