import React from "react"; 
import "./Breadcrumbs.css";

function Breadcrumb(props){
    const crumbs = props.children.map((child) => <li key={child.props.value} className="crumb">{child}</li>)
                                 .reduce((prev, curr, index) => [prev,<li key={index} className="crumb-separator">&gt;</li>,curr]);
    return(
        <ul className="breadcrumbs">
            {crumbs}
        </ul>
    )
}

export default Breadcrumb;