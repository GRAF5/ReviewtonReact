import React from 'react';
import './Button.css';

const IconButton = ({className, onClick, value}) => (
    <button className={"iconButton " + className} onClick={onClick}>{value}</button>
);

export default IconButton;