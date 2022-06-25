import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import "antd/dist/antd.css"
import "./assets/base.min.css"
import './mock/index'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router />
)