import React from 'react';
import "./Button.css";

function Button({style, onClick, value, disabled, children, name, id}){

  return(
    <button className={style?style:""} disabled={disabled} onClick={onClick} name={name} id={id}>{value}</button>
    )
}
/*
function Button(props){
  return (
    <button className={props.status} onClick={props.onClick}>{props.value}</button>
  );
}
*/
export default Button;