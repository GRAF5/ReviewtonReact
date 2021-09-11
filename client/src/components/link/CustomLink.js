import React from 'react';
import "./CustomLink.css";
import { Link } from "@reach/router";

function CustomLink({style, to, value, variant, onClick}){
  return !to ? 
      <a className={(style?style+ " ":"") + (variant?variant:"")} onClick={onClick}><span>{value}</span></a>
          :
      <Link className={(style?style+ " ":"") + (variant?variant:"")} onClick={onClick} to={to?to:''}><span>{value}</span></Link>;
    /*
    <span className={(style?style+ " ":"") + (variant?variant:"")}>
      <a onClick={onClick}>{value}</a>
    </span>
          :
    <span className={(style?style+ " ":"") + (variant?variant:"")}>
      <Link onClick={onClick} to={to?to:''}>{value}</Link>
    </span>
    */
}

export default CustomLink;