import InputField from "../../../input/input-field/InputField";
import Button from "../../../input/button/Button";
import CustomLink from "../../../link/CustomLink";
import { useEffect, useState } from 'react';
import {userActions} from "../../../../redux/actions/userActions";
import './RegisterPage.css';
import { useDispatch, useSelector } from "react-redux";
import FormErrors from "../../../form-errors/FormErrors";

function RegisterPage(){
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.registration.errors);
    const registering = useSelector(state => state.registration.registering);
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        passwordRepeat: ""
    });
    const [userValids, setUserValids] = useState({
        email: false,
        username: false,
        password: false,
        passwordRepeat: false
    });
    const [touched, setTouched] = useState({
        email: false,
        username: false,
        password: false,
        passwordRepeat: false
    });
    const [formValid, setFormValid] = useState(false);
    
    useEffect(()=>{
        setFormValid(userValids.email && userValids.username && userValids.password && userValids.passwordRepeat);
    }, [userValids])

    function handleFieldChange(e, isValid){
        const {id, value} = e.target;
        setUser(user => ({ ...user, [id]:value}));
        setUserValids(userValids => ({ ...userValids, [id]:isValid}));
        setTouched(touched => ({ ...touched, [id]:true}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(userActions.register(user));
    }

    var emailComp = userValids.email || !touched.email ? <InputField 
                                id="email" 
                                label="E-mail" 
                                type="email"
                                placeholder="example@domain.com" 
                                pattern={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
                                onChange={(e, isValid) => handleFieldChange(e, isValid)}/>
                            : <InputField 
                                id="email" 
                                label="E-mail" 
                                type="email"
                                placeholder="example@domain.com" 
                                helperText="Адрес электронной почты"
                                error="Введите корректный e-mail"
                                pattern={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
                                onChange={(e, isValid) => handleFieldChange(e, isValid)}/>                                
    var usernameComp = userValids.username || !touched.username ? <InputField 
                                            id="username" 
                                            label="Имя пользователя" 
                                            minlength={4}
                                            maxlength={20}
                                            helperText="От 4 до 20 символов"
                                            onChange={(e, isValid) => handleFieldChange(e, isValid)}/>
                                    : <InputField 
                                            id="username" 
                                            label="Имя пользователя" 
                                            minlength={4}
                                            maxlength={20}
                                            helperText="От 4 до 20 символов"
                                            error="От 4 до 20 символов"
                                            onChange={(e, isValid) => handleFieldChange(e, isValid)}/>

    var passwordComp = userValids.password || !touched.password ? <InputField 
                                            id="password" 
                                            label="Пароль" 
                                            type="password"
                                            minlength={8}
                                            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}'
                                            helperText="Пароль должен содержать минимум 8 символов, включать латинские буквы верхнего и нижнего регистра, а также цифры"
                                            onChange={(e, isValid) => handleFieldChange(e, isValid)}/>
                                    : <InputField 
                                            id="password" 
                                            label="Пароль" 
                                            type="password"
                                            minlength={8}
                                            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}'
                                            error="Пароль должен содержать минимум 8 символов, включать латинские буквы верхнего и нижнего регистра, а также цифры"
                                            onChange={(e, isValid) => handleFieldChange(e, isValid)}/>
    var passwordRepeatComp = userValids.passwordRepeat || !touched.passwordRepeat ? <InputField 
                                                    id="passwordRepeat" 
                                                    label="Повторите пароль" 
                                                    type="password"
                                                    minlength={8}
                                                    onChange={(e, isValid) => handleFieldChange(e, isValid)}/>
                                                : <InputField 
                                                    id="passwordRepeat" 
                                                    label="Повторите пароль" 
                                                    type="password"
                                                    minlength={8}
                                                    error="Пароли не совподают"
                                                    onChange={(e, isValid) => handleFieldChange(e, isValid)}/>
    var registerButton = formValid ? <Button style="form-button" value="Зарегистрироваться"/> 
                                   : <Button style="form-button" disabled={true} value="Зарегистрироваться"/> ;
    
    return(
        <div className="page-box-thin">
            <div className="box-shadow">
                <div className="page-wrapper">
                    <h1 className="page-name">Регистрация</h1>
                    <FormErrors errors={errors} />
                    <form onSubmit={handleSubmit}>
                        {emailComp}
                        {usernameComp}
                        {passwordComp}
                        {passwordRepeatComp}
                        {registerButton}
                        
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    </form>
                </div>   
            </div>
            <div className="box-shadow-additional">
                <div className="page-wrapper">
                    <span className="form-adition-message">Уже зарегестрированы?&nbsp;<CustomLink to="/login" value="Войдите" /></span>                    
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;