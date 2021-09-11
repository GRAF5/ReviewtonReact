import "./HeadSideBar.css";
import CustomLink from "../../link/CustomLink";
import { useSelector, useDispatch } from 'react-redux';
import {userActions} from '../../../redux/actions/userActions';
import Button from '../../input/button/Button';
import { useState } from "react";

function HeadSideBar({onBack}){
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.login.loggedIn);
    const user = useSelector((state) => state.login.user);
    const [showAdminList, setShowAdminList] = useState(false);

    const adminListComp = showAdminList?
    <ul>
        <li><CustomLink onClick={handleAdminListClick} to="/admin/groups" style="navBar" value="Группы"/></li>
        <li><CustomLink onClick={handleAdminListClick} to="/admin/users" style="navBar" value="Пользователи"/></li>
    </ul>
    : null;

    function handleLinkClick(){
        setShowAdminList(false);
        onBack();
    } 

    function handleAdminListClick(){
        handleAdminClick();
        onBack();
    }
    function handleAdminClick(){
        setShowAdminList(showAdminList=>!showAdminList);
    }
    function logout(){
        dispatch(userActions.logout());
    }
    return (
        <div className="sideBar">
            <div className="sideBar-bg" onClick={onBack}></div>
            <div className="sideBar-wrapper">
                <div className="links-auth">
                    {loggedIn ? 
                                <>
                                    <Button onClick={logout} value="Выйти" />
                                </> 
                                : 
                                <>                                        
                                    <CustomLink onClick={handleLinkClick} to="/login" variant="outlined" value="Войти"/>
                                    <CustomLink onClick={handleLinkClick} to="/register" variant="contained" value="Регистрация"/>
                                </>}    
                </div>
                <hr></hr>
                <nav className="sideBar-links">
                    <CustomLink onClick={handleLinkClick} to="/search" style="navBar" value="Поиск"/>
                    <CustomLink onClick={handleLinkClick} to="/add-article" style="navBar" value="Добавить статью"/>
                    {user && user.role === "admin" && 
                                        <div className="admin-list">
                                            <CustomLink onClick={handleAdminClick} style="navBar" value="Администрирование ⇵"/>
                                            {adminListComp}
                                        </div>}
                </nav>
            </div>
        </div>
    );
}

export default HeadSideBar;