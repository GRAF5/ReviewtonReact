import { useState } from 'react';
import './InputField.css';

function InputField({id, name, label, type, value, placeholder, helperText, error, onChange, minlength, maxlength, pattern}){
    const labelComp = label ? <label className="field-label" htmlFor={id}>{label}</label> :null;
    
    function handleClick(e){
        onChange(e, isValid(e.target.value));
    }
    function isValid(value){
        const re = new RegExp(pattern);
        var patternValid = true;
        var minValid = true;
        var maxValid = true;
        if(pattern)
            patternValid = re.test(value);
        if(minlength)
            minValid = value.length >= minlength ? true : false;
        if(maxlength)
            maxValid = value.length <= maxlength ? true : false;
        return patternValid && minValid && maxValid;
    }
    return(
        <div className="input-field-form">
            {labelComp}
            <input 
                id={id} 
                name={name}
                maxLength={maxlength?maxlength:""}
                className={"input-field "+(error?"error":"")}
                type={type? type:"text"} 
                placeholder={placeholder?placeholder:""}
                onChange={handleClick}
                value={value}
                ></input>
            {(error && <p className="input-field-helpText error">{error}</p>) || (helperText && <p className="input-field-helpText">{helperText}</p>)}
        </div>
    )
}

export default InputField;