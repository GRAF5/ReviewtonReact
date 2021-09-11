import { Router } from "@reach/router";
import AddArticle from "../pages/article/add/AddArticle";
import RegisterPage from "../pages/auth/register/RegisterPage";
import Login from "../pages/auth/login/Login";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import AdminGroup from "../pages/admin/group/AdminGroup";
import AddOrUpdateGroup from "../pages/admin/group/add-or-update-group/AddOrUpdateGroup";

const Body = () => (
    <div className="body">
        <Router>
            <Home path="/" />
            <Search path="search" />
            <AddArticle path="add-article" />
            <RegisterPage path="register" />
            <Login path="login"/>
            <AdminGroup path="admin/groups" />
            <AddOrUpdateGroup path="admin/group/add" />
            <AddOrUpdateGroup path="admin/group/update/:id" />
            
        </Router>
    </div>
);

export default Body;