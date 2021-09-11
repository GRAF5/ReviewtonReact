import React, { useState } from 'react';
import CustomLink from '../link/CustomLink';
import useWindowSize from '../../utils/useWindowSize';
import "./Header.css";
import HeadSideBar from './HeadSideBar/HeadSideBar';
import IconButton from '../input/button/IconButton';
import IconMenuWhite from '../icons/menu-white';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../input/button/Button';
import {userActions} from '../../redux/actions/userActions';

function Header(props){
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.login.loggedIn);
    const user = useSelector((state) => state.login.user);
    const {width, height} = useWindowSize();
    const [sideBar, setSideBar] = useState(false);
    const [showAdminPopover, setShowAdminPopover] = useState(false);

    const adminPopoverComp = showAdminPopover?
    <ul>
        <li><CustomLink onClick={handleAdminClick} to="/admin/groups" style="navBar" value="Группы"/></li>
        <li><CustomLink onClick={handleAdminClick} to="/admin/users" style="navBar" value="Пользователи"/></li>
    </ul>
    : null;
    
    function adminPopoverOff(){
        setShowAdminPopover(false);
    }
    function handleAdminClick(){
        setShowAdminPopover(showAdminPopover=>!showAdminPopover);
    }
    function changeSideBar(){
        setSideBar(sideBar=>!sideBar);
    }
    function logout(){
        dispatch(userActions.logout());
    }
    return (
        <header>
            <div className="page-with">
                <div className="header-container">
                    {width > 750 && (
                        <>
                            <div className="leftElements">
                                <div className="mainLink">                                    
                                    <CustomLink onClick={adminPopoverOff} to="/" style="navBar Main" value="Reviewton"/>
                                </div>
                                <nav className="links">
                                    <CustomLink onClick={adminPopoverOff} to="/search" style="navBar" value="Поиск"/>
                                    <CustomLink onClick={adminPopoverOff} to="/add-article" style="navBar" value="Добавить статью"/>
                                    {user && user.role === "admin" && 
                                        <div className="admin popover">
                                            <CustomLink onClick={handleAdminClick} style="navBar" value="Администрирование ⇵"/>
                                            {adminPopoverComp}
                                        </div>}
                                </nav>
                            </div>
                            <div className="rightElements">
                                {loggedIn ? 
                                    <>
                                        <Button onClick={logout} value="Выйти" />
                                    </> 
                                    : 
                                    <>                                    
                                        <CustomLink onClick={adminPopoverOff} to="/login" style="navBar" variant="outlined" value="Войти"/>
                                        <CustomLink onClick={adminPopoverOff} to="/register" style="navBar" variant="contained" value="Регистрация"/>
                                    </>}                                
                            </div>
                        </>
                    )}    
                    {width < 750 &&(
                        <>
                            <div className="leftElements">
                                <div className="mainLink">                                    
                                    <CustomLink to="/" style="navBar Main" value="Reviewton"/>
                                </div>
                            </div>
                            <div className="rightElements">
                                {!sideBar && (
                                    <IconButton className="menuButton" onClick={() => changeSideBar()} value={<IconMenuWhite />}/>
                                )}
                                {sideBar && (
                                    <HeadSideBar onBack={() => changeSideBar()} />
                                )}
                            </div>
                        </>
                    )}    

                </div>                
            </div>
        </header>
    );
}

export default Header;