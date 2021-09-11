import { useEffect, useState } from 'react';
import InputField from "../../../input/input-field/InputField";
import Button from "../../../input/button/Button";
import FormErrors from "../../../form-errors/FormErrors";
import CustomLink from '../../../link/CustomLink';
import { useDispatch, useSelector } from "react-redux";
import {userActions} from "../../../../redux/actions/userActions";


function Login(props){
    const dispatch = useDispatch();
    const errors = useSelector((state) => state.login.errors);
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [inputsValid, setInputsValid] = useState({
        email: false,
        password: false
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });
    const [formValid, setFormValid] = useState(false);
    
    useEffect(()=>{
        setFormValid(inputsValid.email && inputsValid.password);
    }, [inputsValid]);

    function handleFieldChange(e, isValid){
        const {id, value} = e.target;
        setInputs(inputs => ({ ...inputs, [id]:value}));
        setInputsValid(inputsValid => ({ ...inputsValid, [id]:isValid}));
        setTouched(touched => ({ ...touched, [id]:true}));
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(userActions.login(inputs.email, inputs.password, "/"));
    }

    var emailComp = inputsValid.email || !touched.email ? <InputField 
                                id="email" 
                                label="E-mail" 
                                type="email"
                                placeholder="example@domain.com" 
                                minlength={1}
                                onChange={(e, isValid) => handleFieldChange(e, isValid)}/>  
                            : <InputField 
                                id="email" 
                                label="E-mail" 
                                type="email"
                                placeholder="example@domain.com" 
                                minlength={1}
                                error="Необходимо заполнить поле"
                                onChange={(e, isValid) => handleFieldChange(e, isValid)}/>                                
    
    var passwordComp = inputsValid.password || !touched.password ? <InputField 
                                id="password" 
                                label="Пароль" 
                                type="password"
                                minlength={1}
                                onChange={(e, isValid) => handleFieldChange(e, isValid)}/>
                                : <InputField 
                                id="password" 
                                label="Пароль" 
                                type="password"
                                minlength={1}
                                error="Необходимо заполнить поле"
                                onChange={(e, isValid) => handleFieldChange(e, isValid)}/>
    var loginButton = formValid ? <Button style="form-button" value="Войти"/> 
                                : <Button style="form-button" disabled={true} value="Войти"/> ;

    return(
        <div className="page-box-thin">
            <div className="box-shadow">
                <div className="page-wrapper">
                    <h1 className="page-name">Вход</h1>
                    <FormErrors errors={errors} />
                    <form onSubmit={handleSubmit}>
                        {emailComp}
                        {passwordComp}
                        {loginButton}
                    </form>
                </div>
            </div>
            <div className="box-shadow-additional">
                <div className="page-wrapper">
                    <span className="form-adition-message">Ещё нет аккаунта?&nbsp;<CustomLink to="/register" value="Зарегестрируйтесь" /></span>                    
                </div>
            </div>
        </div>
    )
}

export default Login;