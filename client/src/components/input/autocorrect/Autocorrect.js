import { useState } from 'react';
import '../input-field/InputField.css'
import './Autocorrect.css';

function Autocorrect({id, name, label, type, value, placeholder, helperText, error, onChange, minlength, maxlength, pattern, options}){
    const labelComp = label ? <label className="field-label" htmlFor={id}>{label}</label> :null;
    const [optionsPopover, setOptionsPopOver] = useState();
    //const [opt, setOpt] = useState(filter());
    var opt = options.map(o => o.includes(value) ? <li key={o} name="option" className="option" tabIndex="-1" id={id} onClick={(e) => optionClick(e, o)}>{o}</li> : null);
    const inputComp = <input 
                            id={id} 
                            name={name}
                            maxLength={maxlength?maxlength:""}
                            className={"input-field "+(error?"error":"")}
                            type={type? type:"text"} 
                            placeholder={placeholder?placeholder:""}
                            onChange={(e)=>change(e)}
                            onFocus={(e)=>focus(e)}
                            onBlur={(e)=>blur(e)}
                            value={value}
                            autoComplete="off"
                            >
                    </input>
    function optionClick(e){
        let event = {
            target:{
                id:id,
                name:name,
                value:e.target.textContent
            }
        }
        onChange(event);
        setOptionsPopOver(null);
    }

    function focus(el){       
        setOptionsPopOver(createPopOver(el));
    }

    function blur(e){
        if(!e.relatedTarget || e.relatedTarget.className !== "option"){
            setOptionsPopOver(null);
        }
    }

    function change(e){
        opt = filter(e.target.value);
        onChange(e);
        setOptionsPopOver(createPopOver(e));
    }

    function filter(value){
        return options.map(o => o.toUpperCase().includes(value.toUpperCase()) ? <li key={o} name="option" className="option" tabIndex="-1" id={id} onClick={(e) => optionClick(e, o)}>{o}</li> : null);    
    }

    function createPopOver(el){
        let popover = <div className='autocomplete-popover'  style={{transform:`translate(${el.target.offsetLeft}px, ${el.target.offsetTop + el.target.offsetHeight}px)`, width:`${el.target.offsetWidth}px`}}>
            <ul>
                {opt}
            </ul>
        </div>
        return popover;
    }
    return(
        <>
        <div className='input-field-form'>
            {labelComp}
            {inputComp}
            {(error && <p className="input-field-helpText error">{error}</p>) || (helperText && <p className="input-field-helpText">{helperText}</p>)}
        </div>
        {optionsPopover}
        </>
    )
}

export default Autocorrect;