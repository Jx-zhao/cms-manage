import App from "../App";
import ArticleList from "../pages/ArticleList";
import Edit from "../pages/Edit";
import Means from "../pages/Means";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";

const BaseRouter = () =>(
  <Router>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path="/articlelist" element={<ArticleList />}></Route>
        <Route path="/edit" element={<Edit/>}></Route>
        <Route path="/edit/:id" element={<Edit/>}></Route>
        <Route path="/means" element={<Means/>}></Route>
      </Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      
    </Routes>
  </Router>
)
export default BaseRouter